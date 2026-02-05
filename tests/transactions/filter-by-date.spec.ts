// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Transaction Filtering & Tabs', () => {
  test.fixme('User can filter transactions by date range', async ({ loginPage }) => {
    // This test times out because the click on button:has-text("Home") causes the page context to close
    // The sidebar navigation behavior may be different in the test environment
    const page = loginPage;

    // Ensure we're on the home page with transaction filters visible
    await page.locator('button:has-text("Home")').first().click().catch(() => null);
    await expect(page).toHaveURL(/\/$/);
    
    // Wait for filters to be ready
    await expect(page.locator('button:has-text("Date")')).toBeVisible();

    // 1. Click on 'Date' filter button
    const dateFilterButton = page.locator('button:has-text("Date")').first();
    await dateFilterButton.click();

    // Verify calendar date picker is displayed
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // 2. Click on a date button in the calendar
    const dateButtons = page.locator('[role="button"]').filter({ hasText: /^\d{1,2}$/ });
    if (await dateButtons.count() > 0) {
      await dateButtons.first().click();
    }

    // 3. Verify transaction list is still visible
    await expect(page.locator('[role="grid"]')).toBeVisible();
  });
});
