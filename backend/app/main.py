from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
import pandas as pd
import os

from app.report1 import generate_report1

app = FastAPI(title="Farm Report System API")

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

    # Create reports folder if it doesn't exist
    os.makedirs("reports", exist_ok=True)

    # Output file path
    output_file = "reports/Report1.xlsx"

    # Save report to Excel
    report.to_excel(output_file, index=False)

    # Return Excel file for download
    return FileResponse(
        path=output_file,
        filename="Report1.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

    return {
    "message": "Report Generated Successfully",
    "total_rows": len(df),
    "report": report.to_dict(orient="records")
}
    