// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Transaction Viewing & Details', () => {
  test('User can navigate back from transaction detail to transaction list', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Click on any transaction to view details
    const firstTransaction = page.locator('[role="grid"] >> [data-test^="transaction-item-"]').first();
    await firstTransaction.click();

    // Verify transaction detail page is shown
    await expect(page).toHaveURL(/transaction\//);
    await expect(page.getByRole('heading', { level: 2 })).toContainText('Transaction Detail');

    // 2. Click the 'Home' button in the sidebar to navigate back
    await page.locator('[data-test="sidenav-home"]').click();

    // Verify navigation returns to the home/transaction list page
    await expect(page).toHaveURL(/\/$/);
    
    // Verify transaction list is displayed
    await expect(page.locator('[role="grid"]')).toBeVisible();
    
    // Verify Home button is highlighted/active
    const homeButton = page.locator('[data-test="sidenav-home"]').first();
    await expect(homeButton).toHaveAttribute('class', /Mui|active/);
  });
});