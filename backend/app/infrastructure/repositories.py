from typing import List, Optional, Dict
from datetime import datetime
from app.domain.models import User
from app.domain.repositories import UserRepository

class InMemoryUserRepository(UserRepository):
    """In-memory implementation of UserRepository."""
    
    def __init__(self):
        self.users: Dict[int, User] = {}
        self.next_id = 1
        
        # Add some test users
        self._add_test_users()
    
    def _add_test_users(self):
        """Add test users for development."""
        from app.core.security import get_password_hash
        
        # Test user 1
        user1 = User(
            username="testuser",
            email="test@example.com",
            hashed_password=get_password_hash("password123"),
            is_active=True,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        self.create(user1)
        
        # Test user 2
        user2 = User(
            username="johndoe",
            email="john@example.com",
            hashed_password=get_password_hash("securepass"),
            is_active=True,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        self.create(user2)
    
    def get_by_id(self, user_id: int) -> Optional[User]:
        """Get a user by ID."""
        return self.users.get(user_id)
    
    def get_by_username(self, username: str) -> Optional[User]:
        """Get a user by username."""
        for user in self.users.values():
            if user.username == username:
                return user
        return None
    
    def get_by_email(self, email: str) -> Optional[User]:
        """Get a user by email."""
        for user in self.users.values():
            if user.email == email:
                return user
        return None
    
    def create(self, user: User) -> User:
        """Create a new user."""
        user.id = self.next_id
        self.users[user.id] = user
        self.next_id += 1
        return user
    
    def update(self, user: User) -> User:
        """Update an existing user."""
        if user.id not in self.users:
            raise ValueError(f"User with ID {user.id} not found")
        
        user.updated_at = datetime.utcnow()
        self.users[user.id] = user
        return user
    
    def delete(self, user_id: int) -> bool:
        """Delete a user."""
        if user_id not in self.users:
            return False
        
        del self.users[user_id]
        return True
    
    def list(self) -> List[User]:
        """List all users."""
        return list(self.users.values())