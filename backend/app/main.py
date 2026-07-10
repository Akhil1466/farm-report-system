from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
import pandas as pd
import os

from app.database import SessionLocal, engine
from app.models import Base, User, Report
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
def login(data: LoginRequest):

    if data.username == "admin" and data.password == "Admin@123":
        return {
            "success": True,
            "token": "demo-token",
            "username": "admin",
            "role": "Admin",
        }

    raise HTTPException(
        status_code=401,
        detail="Invalid Username or Password",
    )


# -----------------------------
# Upload Excel
# -----------------------------
@app.post("/upload")
async def upload_excel(
    file: UploadFile = File(...),
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
            uploaded_by=1,
        )

        db.add(new_report)
        db.commit()

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
# -----------------------------
@app.get("/users")
def get_users(db: Session = Depends(get_db)):

    users = db.query(User).all()

    return users


# -----------------------------
# Get Reports
# -----------------------------
@app.get("/reports")
def get_reports(db: Session = Depends(get_db)):

    reports = db.query(Report).all()

    return reports