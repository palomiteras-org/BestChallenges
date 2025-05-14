from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="BestChallenges API",
    description="API for BestChallenges application",
    version="0.1.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to BestChallenges API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Import and include routers
# from app.api.routes import challenges, users
# app.include_router(challenges.router, prefix="/api/challenges", tags=["challenges"])
# app.include_router(users.router, prefix="/api/users", tags=["users"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)