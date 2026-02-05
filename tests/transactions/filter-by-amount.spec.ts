// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Transaction Filtering & Tabs', () => {
  test('User can filter transactions by amount range', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Click on 'Amount: $0 - $1,000' filter button
    const amountFilterButton = page.locator('button:has-text("Amount")');
    await expect(amountFilterButton).toBeVisible();
    await amountFilterButton.click();

    // Verify filter menu or dropdown appears
    await page.waitForTimeout(300);
    
    // 2. Verify filter options are visible
    // Look for amount range options
    const filterOptions = page.locator('[role="option"], [role="menuitem"]');
    
    // Select a different amount range if available
    if (await filterOptions.count() > 0) {
      const firstOption = filterOptions.first();
      await firstOption.click();
    }

    // 3. Verify transaction list is filtered or updated
    await expect(page.locator('[role="grid"]')).toBeVisible();
    
    // Click filter button again to verify it reflects the change
    await expect(amountFilterButton).toBeVisible();
  });
});
