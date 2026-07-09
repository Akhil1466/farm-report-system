from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os

from app.report1 import generate_report1

app = FastAPI(title="Farm Report System API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.app\.github\.dev",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Farm Report System API is Running"}

@app.get("/health")
def health():
    return {"status": "OK"}

@app.post("/upload")
async def upload_excel(file: UploadFile = File(...)):
    # Read uploaded Excel
    df = pd.read_excel(file.file)

    # Generate report
    report = generate_report1(df)

    # Create reports folder
    os.makedirs("reports", exist_ok=True)
    output_file = "reports/Report1.xlsx"

    # Save report
    report.to_excel(output_file, index=False)

    # Return report
    return FileResponse(
        path=output_file,
        filename="Report1.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )