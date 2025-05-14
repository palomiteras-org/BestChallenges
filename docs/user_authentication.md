# User Authentication

This document provides an overview of the user authentication implementation in the BestChallenges application.

## Features

- User login with username/email and password
- JWT token-based authentication
- Protected routes for authenticated users
- Rate limiting to prevent brute force attacks
- Form validation
- Error handling

## Backend Implementation

### Authentication Flow

1. User submits login credentials (username/email and password)
2. Backend validates credentials against stored user data
3. If valid, a JWT token is generated and returned
4. The token is used for subsequent authenticated requests

### Components

- **User Model** (`app/domain/models.py`): Defines the user domain model
- **User Repository** (`app/domain/repositories.py` and `app/infrastructure/repositories.py`): Interfaces and implementations for user data access
- **Authentication Service** (`app/services/auth.py`): Handles user authentication and token generation
- **Security Utilities** (`app/core/security.py`): Provides password hashing and JWT token utilities
- **Authentication Routes** (`app/api/routes/auth.py`): Defines API endpoints for authentication

### API Endpoints

- `POST /api/auth/login`: Form-based login endpoint
- `POST /api/auth/login/json`: JSON-based login endpoint
- `GET /api/auth/me`: Endpoint to get the current authenticated user

## Frontend Implementation

### Authentication Flow

1. User enters credentials in the login form
2. Frontend validates the form inputs
3. If valid, credentials are sent to the backend
4. If authentication is successful, the JWT token is stored in localStorage
5. The token is included in subsequent API requests
6. Protected routes check for authentication before rendering

### Components

- **Authentication Context** (`src/contexts/AuthContext.tsx`): Provides authentication state and methods
- **Login Page** (`src/pages/Login.tsx`): Renders the login form and handles form submission
- **Protected Route** (`src/components/ProtectedRoute.tsx`): Higher-order component for routes that require authentication

## Testing

### Backend Tests

- Unit tests for authentication endpoints
- Tests for valid and invalid credentials
- Tests for token validation

### Frontend Tests

- Unit tests for the Login component
- Tests for form validation
- Tests for successful and failed login attempts

## Security Considerations

- Passwords are hashed using bcrypt
- JWT tokens have a limited expiration time
- Rate limiting is implemented to prevent brute force attacks
- CORS is configured to allow only specific origins
- Form inputs are validated on both client and server sides

## Future Improvements

- Implement user registration
- Add password reset functionality
- Implement refresh token mechanism
- Add multi-factor authentication
- Implement account lockout after multiple failed attempts