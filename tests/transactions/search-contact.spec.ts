// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Transaction Management - Create & Send Payments', () => {
  test('User can search for and select contact from contact list', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Click the 'New' button to start transaction creation
    await page.locator('[data-test="nav-top-new-transaction"]').click();
    await expect(page).toHaveURL(/transaction\/new/);

    // 2. Type 'Klaus' in the search box to filter contacts
    const searchInput = page.locator('[data-test="user-list-search-input"]');
    await searchInput.focus();
    await page.locator('[data-test="user-list-search-input"]').pressSequentially('Klaus');

    // Verify search is entered
    await expect(searchInput).toHaveValue('Klaus');

    // 3. Verify Klaus Müller appears in filtered results
    const klausList = page.locator('[data-test="user-list-item-uV0xLLxBW"]');
    await expect(klausList).toBeVisible();
    
    // 4. Click on Klaus Müller to select contact
    await page.locator('[data-test="user-list-item-uV0xLLxBW"]').click();
    
    // Verify contact is selected and payment form appears
    await expect(page.getByRole('heading', { level: 2 })).toContainText('Klaus Müller');
    await expect(page.getByRole('textbox', { name: 'Amount' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Add a note' })).toBeVisible();
  });
});