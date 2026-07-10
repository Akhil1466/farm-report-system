from app.schemas import UserCreate, UserUpdate
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.auth import get_current_user
from sqlalchemy.orm import Session
from app.security import hash_password, verify_password
from app.jwt_handler import create_access_token
import pandas as pd
import os
from app.database import engine, SessionLocal
from app.models import Base, User, Report, AuditLog
from app.report1 import generate_report1

# Create Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Farm Report System API")


# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Change later for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Database Dependency
# -----------------------------
def save_log(db: Session, username: str, action: str):
    log = AuditLog(
        username=username,
        action=action,
    )

    db.add(log)
    db.commit()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# Login Model
# -----------------------------
class LoginRequest(BaseModel):
    username: str
    password: str


# -----------------------------
# Home
# -----------------------------
@app.get("/")
def home():
    return {"message": "Farm Report System API Running"}


# -----------------------------
# Health
# -----------------------------
@app.get("/health")
def health():
    return {"status": "OK"}


# -----------------------------
# Login
# -----------------------------
@app.post("/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(
        User.username == data.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Username or Password",
        )

    if not verify_password(data.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid Username or Password",
        )

    token = create_access_token(
        {
            "sub": user.username,
            "role": user.role,
            "id": user.id,
            
        }
    )

    return {
        "success": True,
        "access_token": token,
        "token_type": "bearer",
        "username": user.username,
        "role": user.role,
    }


# -----------------------------
# Upload Excel
# -----------------------------
@app.post("/upload")
async def upload_excel(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:

        df = pd.read_excel(file.file)

        report = generate_report1(df)

        os.makedirs("reports", exist_ok=True)

        output_file = "reports/Report1.xlsx"

        report.to_excel(output_file, index=False)

        new_report = Report(
            filename=file.filename,
            report_name="Report1.xlsx",
            uploaded_by=current_user.id,
        )

        db.add(new_report)
        db.commit()
        save_log(db, current_user.username, "Report Uploaded")

        return FileResponse(
            output_file,
            filename="Report1.xlsx",
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# -----------------------------
# Download Report
# -----------------------------
@app.get("/download")
def download():

    output_file = "reports/Report1.xlsx"

    if not os.path.exists(output_file):
        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    return FileResponse(
        output_file,
        filename="Report1.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


# -----------------------------
# Get Users
@app.post("/users")
def create_user(user: UserCreate, db: Session = Depends(get_db)):

    existing = db.query(User).filter(
        (User.username == user.username) |
        (User.email == user.email)
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password),
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully"
    }
# -----------------------------
@app.get("/users")
def get_users(db: Session = Depends(get_db)):

    users = db.query(User).all()

    return users


# -----------------------------
# Get Reports
# -----------------------------
# Get Users
# -----------------------------
@app.get("/users")
def get_users(db: Session = Depends(get_db)):

    users = db.query(User).all()

    return users


# -----------------------------
# Create User
# -----------------------------
@app.post("/users")
def create_user(user: UserCreate, db: Session = Depends(get_db)):

    existing = db.query(User).filter(
        (User.username == user.username) |
        (User.email == user.email)
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    new_user = User(
        username=user.username,
        email=user.email,
        password=user.password,
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully"
    }


# -----------------------------
# Update User

# -----------------------------
@app.put("/users/{user_id}")
def update_user(
    user_id: int,
    user: UserUpdate,
    db: Session = Depends(get_db),
):

    db_user = db.query(User).filter(User.id == user_id).first()
    save_log(
    db,
    db_user.username,
    "User Updated"
)

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    db_user.username = user.username
    db_user.email = user.email
    db_user.role = user.role

    db.commit()
    save_log(
        db,
        db_user.username,
        "User Updated"
    )

    return {
        "message": "User updated successfully"
    }


# -----------------------------
# Delete User
@app.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
):

    db_user = db.query(User).filter(User.id == user_id).first()

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Username delete cheyyadaniki mundu save chesukovali
    username = db_user.username

    db.delete(db_user)
    db.commit()

    save_log(
        db,
        username,
        "User Deleted"
    )

    return {
        "message": "User deleted successfully"
    }
# -----------------------------
@app.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
):

    db_user = db.query(User).filter(User.id == user_id).first()

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    db.delete(db_user)
    db.commit()

    return {
        "message": "User deleted successfully"
    }

@app.get("/users")
def get_users(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    total_users = db.query(User).count()
    total_reports = db.query(Report).count()

    return {
        "total_users": total_users,
        "total_reports": total_reports,
        "active_users": total_users,
        "pending_reports": 0,
    }
# -----------------------------
# Get Reports
# -----------------------------
@app.get("/reports")
def get_reports(db: Session = Depends(get_db)):

    reports = db.query(Report).all()

    return reports
# -----------------------------
@app.get("/reports")
def get_reports(db: Session = Depends(get_db)):

    reports = db.query(Report).all()

    return reports
# -----------------------------
# Dashboard
# -----------------------------
@app.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):

    total_users = db.query(User).count()
    total_reports = db.query(Report).count()

    return {
        "total_users": total_users,
        "total_reports": total_reports,
        "active_users": total_users,
        "pending_reports": 0
    }