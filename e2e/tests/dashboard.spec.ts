import { test, expect } from '@playwright/test';

// This assumes your app is running at http://localhost:5173 or similar
// Adjust the URL as needed for your dev environment

test.describe('Dashboard E2E', () => {
  test.beforeEach(async ({ page }) => {
    // You may need to login or navigate to /dashboard directly
    await page.goto('/dashboard');
  });

  test('should display dashboard title and all cards', async ({ page }) => {
    await expect(page.getByText('Dashboard')).toBeVisible();
    await expect(page.getByText('Profile')).toBeVisible();
    await expect(page.getByText('Friends')).toBeVisible();
    await expect(page.getByText('Challenges')).toBeVisible();
  });

  test('should display profile fields', async ({ page }) => {
    await expect(page.getByText('Points:')).toBeVisible();
    await expect(page.getByText('Perseverance:')).toBeVisible();
    await expect(page.getByText('Level:')).toBeVisible();
    await expect(page.getByText('Resistance Points:')).toBeVisible();
    await expect(page.getByText('Mind Points:')).toBeVisible();
    await expect(page.getByText('Force Points:')).toBeVisible();
    await expect(page.getByText('Flexibility Points:')).toBeVisible();
  });

  test('should display friends and challenges info', async ({ page }) => {
    await expect(page.getByText(/You have/)).toBeVisible();
    await expect(page.getByText(/You are in/)).toBeVisible();
  });
});

