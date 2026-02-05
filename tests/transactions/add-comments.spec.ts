// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Transaction Viewing & Details', () => {
  test('User can add and view comments on transactions', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Click on the first transaction to view details
    const firstTransaction = page.locator('[role="grid"] >> [data-test^="transaction-item-"]').first();
    await firstTransaction.click();

    // Verify transaction detail page is displayed
    await expect(page).toHaveURL(/transaction\//);
    await expect(page.getByRole('heading', { level: 2 })).toContainText('Transaction Detail');

    // 2. Verify comment section is visible showing '0' comments initially
    const commentCount = page.locator('text="0"').first();
    await expect(commentCount).toBeVisible();

    // 3. Find and focus on the comment input field
    const commentInput = page.getByRole('textbox', { name: 'Write a comment...' });
    await expect(commentInput).toBeVisible();

    // 4. Type comment text
    await commentInput.fill('This looks correct');
    await expect(commentInput).toHaveValue('This looks correct');

    // 5. Submit comment by pressing Enter
    await commentInput.press('Enter');

    // 6. Verify comment appears and count increases
    await expect(page.locator('text="This looks correct"')).toBeVisible();
    
    // Comment count should increase
    await expect(page.locator('text="1"')).toBeVisible();
  });
});
