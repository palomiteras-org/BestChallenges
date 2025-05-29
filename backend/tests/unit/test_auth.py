import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.auth import auth_service

client = TestClient(app)

def test_login_with_valid_credentials():
    """Test login with valid credentials."""
    response = client.post(
        "/api/auth/login",
        data={
            "username": "testuser",
            "password": "password123"
        },
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_with_invalid_credentials():
    """Test login with invalid credentials."""
    response = client.post(
        "/api/auth/login",
        data={
            "username": "testuser",
            "password": "wrongpassword"
        },
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert response.status_code == 401
    assert "detail" in response.json()

def test_login_json_with_valid_credentials():
    """Test JSON login with valid credentials."""
    response = client.post(
        "/api/auth/login/json",
        json={
            "email": "test@example.com",
            "password": "password123"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_json_with_invalid_credentials():
    """Test JSON login with invalid credentials."""
    response = client.post(
        "/api/auth/login/json",
        json={
            "email": "test@example.com",
            "password": "wrongpassword"
        }
    )
    assert response.status_code == 401
    assert "detail" in response.json()

def test_login_json_with_missing_credentials():
    """Test JSON login with missing credentials."""
    response = client.post(
        "/api/auth/login/json",
        json={
            "password": "password123"
        }
    )
    assert response.status_code == 400
    assert "detail" in response.json()

def test_get_current_user():
    """Test getting the current user."""
    # First login to get a token
    login_response = client.post(
        "/api/auth/login",
        data={
            "username": "testuser",
            "password": "password123"
        },
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    token = login_response.json()["access_token"]
    
    # Then use the token to get the current user
    response = client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    user_data = response.json()
    assert user_data["username"] == "testuser"
    assert user_data["email"] == "test@example.com"

def test_get_current_user_with_invalid_token():
    """Test getting the current user with an invalid token."""
    response = client.get(
        "/api/auth/me",
        headers={"Authorization": "Bearer invalidtoken"}
    )
    assert response.status_code == 401
    assert "detail" in response.json()