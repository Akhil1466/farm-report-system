from pydantic import BaseModel
from datetime import datetime


class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    role: str
    created_at: datetime

    class Config:
        from_attributes = True


class ReportResponse(BaseModel):
    id: int
    filename: str
    report_name: str
    created_at: datetime

    class Config:
        from_attributes = True