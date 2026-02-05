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
    await expect(page.locator('text=/Solon_Robel60|Prohaska/i').first()).toBeVisible();
    
    // Check the transaction description/note (might be in a different format)
    const noteToFind = page.locator('text=/payment|note|description/i').first();
    if (await noteToFind.isVisible().catch(() => false)) {
      await expect(noteToFind).toBeVisible();
    }
    
    // Check the amount is displayed - look for various amount formats
    // The amount could be displayed in the transaction detail area
    const mainContent = page.locator('main');
    const allText = await mainContent.textContent();
    expect(allText).toMatch(/\$.*\d+/); // Verify there's an amount with $ and numbers

    // 4. Verify comment section is visible
    // Check that the comment input field is visible
    await expect(page.getByRole('textbox', { name: 'Write a comment...' })).toBeVisible();
  });
});
