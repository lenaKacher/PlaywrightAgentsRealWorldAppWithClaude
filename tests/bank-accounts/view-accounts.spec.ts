// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Bank Accounts Management', () => {
  test('User can view bank accounts list', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Click 'Bank Accounts' button in the sidebar
    await page.locator('[data-test="sidenav-bankaccounts"]').click();

    // 2. Verify Bank Accounts page is displayed
    await expect(page).toHaveURL(/bankaccounts/);
    await expect(page.getByRole('heading', { name: 'Bank Accounts', exact: true })).toBeVisible();

    // 3. Verify list of bank accounts is visible
    // Wait for accounts to load by checking for Create button
    await expect(page.getByRole('button', { name: 'Create' })).toBeVisible();
    
    // Verify bank account items are displayed by checking for multiple deleted accounts
    await expect(page.locator('text=Deleted').first()).toBeVisible();

    // 4. Verify 'Create' button is visible for adding new accounts
    const createButton = page.getByRole('button', { name: 'Create' });
    await expect(createButton).toBeVisible();
    
    // Verify button is clickable
    await expect(createButton).toBeEnabled();
  });
});
