from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    role: str

class UserUpdate(BaseModel):
    username: str
    email: str
    role: str