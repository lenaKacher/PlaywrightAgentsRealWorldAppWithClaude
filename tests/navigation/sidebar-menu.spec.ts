// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Navigation & Layout', () => {
  test('User can navigate using sidebar menu', async ({ loginPage }) => {
    const page = loginPage;

    // 1. From home page, click 'Home' in sidebar to verify it's active
    const homeButton = page.locator('[data-test="sidenav-home"]').first();
    await homeButton.click();
    
    // Verify user is on home page
    await expect(page).toHaveURL(/\/$/);
    
    // Verify Home button is highlighted/active
    await expect(homeButton).toHaveAttribute('class', /Mui|active/);
    
    // Verify transaction list is displayed
    await expect(page.locator('[role="grid"]')).toBeVisible();

    // 2. Click 'My Account'
    const myAccountButton = page.locator('[data-test="sidenav-myaccount"]');
    await myAccountButton.click();
    
    // Verify User Settings page is displayed
    await expect(page).toHaveURL(/settings/);
    await expect(page.getByRole('heading', { name: 'User Settings' })).toBeVisible();
    
    // Verify My Account button is highlighted
    await expect(myAccountButton).toHaveAttribute('class', /Mui|active/);

    // 3. Click 'Bank Accounts'
    const bankAccountsButton = page.locator('[data-test="sidenav-bankaccounts"]');
    await bankAccountsButton.click();
    
    // Verify Bank Accounts page is displayed
    await expect(page).toHaveURL(/bankaccounts/);
    await expect(page.getByRole('heading', { name: 'Bank Accounts' })).toBeVisible();

    // 4. Click 'Home' again
    await homeButton.click();
    
    // Verify navigation returns to home page
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('[role="grid"]')).toBeVisible();
  });
});
