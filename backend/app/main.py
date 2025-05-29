from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

# Create a rate limiter
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="BestChallenges API",
    description="API for BestChallenges application",
    version="0.1.0",
)

# Add rate limiter to the app
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

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
from app.api.routes import auth
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
# from app.api.routes import challenges, users
# app.include_router(challenges.router, prefix="/api/challenges", tags=["challenges"])
# app.include_router(users.router, prefix="/api/users", tags=["users"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
