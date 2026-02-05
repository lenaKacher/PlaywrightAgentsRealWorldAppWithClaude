// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Transaction Viewing & Details', () => {
  test('User can view transaction details page', async ({ loginPage }) => {
    const page = loginPage;

    // 1. On the home page, click on any transaction from the list
    // Get the first transaction item and click it
    const firstTransaction = page.locator('[role="grid"] >> [data-test^="transaction-item-"]').first();
    await firstTransaction.click();

    // 2. Verify transaction detail page is displayed with heading
    await expect(page).toHaveURL(/transaction\//);
    await expect(page.getByRole('heading', { level: 2 })).toContainText('Transaction Detail');

    // 3. Verify transaction information includes: sender name, receiver name, amount, and description
    // Check that transaction shows the parties involved
    await expect(page.locator('text=Lenore L Solon_Robel60 paid Reece Prohaska')).toBeVisible();
    
    // Check the transaction description/note
    await expect(page.locator('text=Dinner payment')).toBeVisible();
    
    // Check the amount is displayed
    await expect(page.locator('text=-$75.50')).toBeVisible();

    // 4. Verify comment section is visible with comment count
    // Check that comment count is visible and shows "0"
    await expect(page.locator('text="0"').first()).toBeVisible();
    
    // Check that the comment input field is visible
    await expect(page.getByRole('textbox', { name: 'Write a comment...' })).toBeVisible();
  });
});
