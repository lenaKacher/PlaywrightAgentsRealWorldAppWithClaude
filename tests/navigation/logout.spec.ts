// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Navigation & Layout', () => {
  test('User can logout from the application', async ({ loginPage }) => {
    const page = loginPage;

    // Verify we're logged in on the home page
    await expect(page).toHaveURL(/\/$/);
    
    // Verify user profile is visible in sidebar (indicating logged in state)
    await expect(page.locator('text=@Solon_Robel60')).toBeVisible();

    // 1. Click 'Logout' button in the sidebar
    const logoutButton = page.locator('[data-test="sidenav-logout"]');
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();

    // 2. Verify user is logged out and redirected to login page
    await expect(page).toHaveURL(/login|signin|auth/);
    
    // Verify login page elements are visible
    // Look for login form or signin elements
    const loginForm = page.locator('form, [role="form"], [data-test*="login"], [data-test*="signin"]');
    await expect(loginForm).toBeVisible();

    // Verify user profile is no longer visible (logged out)
    await expect(page.locator('text=@Solon_Robel60')).not.toBeVisible();
  });
});
