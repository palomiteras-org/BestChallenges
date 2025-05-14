from typing import Optional
from datetime import timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.domain.models import User
from app.domain.repositories import UserRepository
from app.infrastructure.repositories import InMemoryUserRepository
from app.core.security import (
    verify_password,
    create_access_token,
    decode_token,
    oauth2_scheme,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

class AuthService:
    """Service for user authentication."""
    
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository
    
    def authenticate_user(self, username_or_email: str, password: str) -> Optional[User]:
        """Authenticate a user by username/email and password."""
        # Try to get user by username
        user = self.user_repository.get_by_username(username_or_email)
        
        # If not found, try by email
        if not user:
            user = self.user_repository.get_by_email(username_or_email)
        
        # If still not found or password doesn't match, return None
        if not user or not verify_password(password, user.hashed_password):
            return None
        
        return user
    
    def create_user_token(self, user: User) -> dict:
        """Create an access token for a user."""
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.username},
            expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    
    def get_current_user(self, token: str = Depends(oauth2_scheme)) -> User:
        """Get the current authenticated user from the token."""
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
        try:
            payload = decode_token(token)
            username = payload.get("sub")
            if username is None:
                raise credentials_exception
        except Exception:
            raise credentials_exception
        
        user = self.user_repository.get_by_username(username)
        if user is None:
            raise credentials_exception
        
        return user

# Create a singleton instance of the auth service
user_repository = InMemoryUserRepository()
auth_service = AuthService(user_repository)