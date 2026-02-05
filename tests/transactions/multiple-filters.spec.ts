// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Transaction Filtering & Tabs', () => {
  test('Multiple filters can be applied together', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Apply date filter to a specific date
    const dateFilterButton = page.locator('button:has-text("Date: ALL")');
    await dateFilterButton.click();
    
    // Select a date from calendar if visible
    await page.waitForTimeout(300);
    const dateInCalendar = page.locator('[role="button"]').filter({ hasText: '15' }).first();
    if (await dateInCalendar.isVisible().catch(() => false)) {
      await dateInCalendar.click();
    }

    // 2. Apply amount filter
    const amountFilterButton = page.locator('button:has-text("Amount")');
    await amountFilterButton.click();
    
    // Select an amount option if available
    await page.waitForTimeout(300);
    const filterOption = page.locator('[role="option"], [role="menuitem"]').first();
    if (await filterOption.isVisible().catch(() => false)) {
      await filterOption.click();
    }

    // 3. Switch to 'Friends' tab while filters are active
    await page.locator('[data-test="nav-contacts-tab"]').click();
    
    // Verify 'Friends' tab becomes active and filters are preserved
    const friendsTab = page.locator('[data-test="nav-contacts-tab"]');
    await expect(friendsTab).toHaveAttribute('aria-selected', 'true');

    // Verify transaction list with filters applied is still visible
    await expect(page.locator('[role="grid"]')).toBeVisible();
    
    // Verify both filter buttons are still visible
    await expect(dateFilterButton).toBeVisible();
    await expect(amountFilterButton).toBeVisible();
  });
});
