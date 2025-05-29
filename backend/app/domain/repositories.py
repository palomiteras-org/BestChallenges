from abc import ABC, abstractmethod
from typing import List, Optional
from .models import User

class UserRepository(ABC):
    """Interface for user repository."""
    
    @abstractmethod
    def get_by_id(self, user_id: int) -> Optional[User]:
        """Get a user by ID."""
        pass
    
    @abstractmethod
    def get_by_username(self, username: str) -> Optional[User]:
        """Get a user by username."""
        pass
    
    @abstractmethod
    def get_by_email(self, email: str) -> Optional[User]:
        """Get a user by email."""
        pass
    
    @abstractmethod
    def create(self, user: User) -> User:
        """Create a new user."""
        pass
    
    @abstractmethod
    def update(self, user: User) -> User:
        """Update an existing user."""
        pass
    
    @abstractmethod
    def delete(self, user_id: int) -> bool:
        """Delete a user."""
        pass
    
    @abstractmethod
    def list(self) -> List[User]:
        """List all users."""
        pass