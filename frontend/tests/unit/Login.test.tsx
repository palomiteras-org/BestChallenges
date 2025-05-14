import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../src/contexts/AuthContext';
import Login from '../../src/pages/Login';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock axios.create to return axios
    mockedAxios.create.mockReturnValue(mockedAxios);
    
    // Render the component
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  test('renders login form', () => {
    // Check if the title is rendered
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    
    // Check if form elements are rendered
    expect(screen.getByPlaceholderText('Username or Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  test('validates form inputs', async () => {
    // Submit form without inputs
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText('Username or email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
    
    // Fill in username but with short password
    fireEvent.change(screen.getByPlaceholderText('Username or Email'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'short' },
    });
    
    // Submit form again
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    
    // Check for password validation error
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });
  });

  test('submits form with valid inputs', async () => {
    // Mock successful login
    mockedAxios.post.mockResolvedValueOnce({
      data: { access_token: 'fake-token', token_type: 'bearer' },
    });
    
    // Fill in form with valid inputs
    fireEvent.change(screen.getByPlaceholderText('Username or Email'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    
    // Check if login function was called with correct parameters
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/api/auth/login/json',
        {
          email: undefined,
          username: 'testuser',
          password: 'password123',
        }
      );
      
      // Check if navigation was triggered
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('handles login error', async () => {
    // Mock failed login
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          detail: 'Incorrect username/email or password',
        },
      },
    });
    
    // Fill in form with invalid inputs
    fireEvent.change(screen.getByPlaceholderText('Username or Email'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    
    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Authentication Error')).toBeInTheDocument();
      expect(screen.getByText('Incorrect username/email or password')).toBeInTheDocument();
    });
  });
});