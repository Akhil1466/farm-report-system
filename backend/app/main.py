from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Farm Report System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://turbo-potato-v657646ggp99hp45q-3000.app.github.dev",
        "https://farm-report-system.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)