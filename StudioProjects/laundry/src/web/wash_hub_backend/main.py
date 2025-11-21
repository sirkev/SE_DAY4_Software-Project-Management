from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from src.config.database import init_db
from src.controller import user_lead_controller, business_lead_controller

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(
    title="Wash Hub API",
    description="Backend API for Wash Hub services",
    version="0.1.0",
    lifespan=lifespan
)

# CORS Configuration
origins = [
    "http://localhost",
    "http://localhost:80",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(user_lead_controller.router, prefix="/api/leads/user", tags=["User Leads"])
app.include_router(business_lead_controller.router, prefix="/api/leads/business", tags=["Business Leads"])

@app.get("/")
async def root():
    return {"message": "Welcome to Wash Hub API"}
