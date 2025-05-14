from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordRequestForm
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.api.schemas import Token, UserLogin, UserResponse
from app.services.auth import auth_service
from app.domain.models import User

# Create a rate limiter
limiter = Limiter(key_func=get_remote_address)

router = APIRouter()

@router.post("/login", response_model=Token)
@limiter.limit("5/minute")
async def login(request: Request, form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Authenticate a user and return an access token.

    - **username**: Username or email
    - **password**: User password
    """
    user = auth_service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username/email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return auth_service.create_user_token(user)

@router.post("/login/json", response_model=Token)
@limiter.limit("5/minute")
async def login_json(request: Request, user_data: UserLogin):
    """
    Authenticate a user using JSON and return an access token.

    - **username**: Optional username
    - **email**: Optional email
    - **password**: User password
    """
    # Use either username or email
    username_or_email = user_data.username or user_data.email
    if not username_or_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email is required",
        )

    user = auth_service.authenticate_user(username_or_email, user_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username/email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return auth_service.create_user_token(user)

@router.get("/me", response_model=UserResponse)
async def get_current_user(current_user: User = Depends(auth_service.get_current_user)):
    """Get the current authenticated user."""
    return current_user
