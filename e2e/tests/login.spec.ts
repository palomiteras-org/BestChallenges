import { test, expect } from '@playwright/test';

test.describe('Login functionality', () => {
  test('should show validation errors for empty fields', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');

    // Check the page title
    await expect(page).toHaveTitle(/BestChallenges/);

    // Submit the form without entering any data
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Check for validation error messages
    await expect(page.getByText('Username or email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('should show validation error for short password', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');

    // Enter username but a short password
    await page.getByPlaceholder('Username or Email').fill('testuser');
    await page.getByPlaceholder('Password').fill('short');

    // Submit the form
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Check for password validation error
    await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');

    // Enter invalid credentials
    await page.getByPlaceholder('Username or Email').fill('testuser');
    await page.getByPlaceholder('Password').fill('wrongpassword');

    // Submit the form
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Check for authentication error message
    await expect(page.getByText('Authentication Error')).toBeVisible();
    await expect(page.getByText('Incorrect username/email or password')).toBeVisible();
  });

  test('should redirect to dashboard after successful login', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');

    // Enter valid credentials (using the test user from the backend)
    await page.getByPlaceholder('Username or Email').fill('testuser');
    await page.getByPlaceholder('Password').fill('password123');

    // Submit the form
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Check that we're redirected to the home page
    await expect(page).toHaveURL('/');
  });

  test('should not allow access to protected routes when not logged in', async ({ page }) => {
    // Try to access the dashboard directly
    await page.goto('/dashboard');

    // Check that we're redirected to the login page
    await expect(page).toHaveURL('/login');
  });

  test('should allow access to protected routes after login', async ({ page }) => {
    // First login
    await page.goto('/login');
    await page.getByPlaceholder('Username or Email').fill('testuser');
    await page.getByPlaceholder('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Now try to access the dashboard
    await page.goto('/dashboard');

    // Check that we can access the dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome to your dashboard!')).toBeVisible();
  });
});