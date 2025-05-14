import { test, expect } from '@playwright/test';

test('homepage has correct title and content', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');

  // Check the page title
  await expect(page).toHaveTitle(/BestChallenges/);

  // Check for the heading
  const heading = page.locator('h1:has-text("BestChallenges")');
  await expect(heading).toBeVisible();

  // Check for the welcome message
  const welcomeMessage = page.locator('p:has-text("Welcome to BestChallenges")');
  await expect(welcomeMessage).toBeVisible();

  // Check for the description
  const description = page.locator('p:has-text("This is a demo application")');
  await expect(description).toBeVisible();
});

test('API health check is working', async ({ page, request }) => {
  // Make a direct request to the API health endpoint
  const response = await request.get('http://localhost:8000/health');
  
  // Check that the response is successful
  expect(response.ok()).toBeTruthy();
  
  // Check the response body
  const body = await response.json();
  expect(body).toEqual({ status: 'healthy' });
});