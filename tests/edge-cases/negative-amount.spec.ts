// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Edge Cases & Error Handling', () => {
  test('User cannot enter negative amount', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Click 'New' and select a contact
    await page.locator('[data-test="nav-top-new-transaction"]').click();
    await expect(page).toHaveURL(/transaction\/new/);

    // Select a contact
    await page.locator('[data-test="user-list-item-5beuD3-B59"]').click();
    await expect(page.getByRole('heading', { level: 2 })).toContainText('Reece Prohaska');

    // 2. Try to enter negative amount (e.g., '-50')
    const amountField = page.getByRole('textbox', { name: 'Amount' });
    
    // Try typing negative value
    await amountField.fill('-50');
    
    // Check the actual value - it should either:
    // - Be empty (negative rejected)
    // - Show positive value (- converted to +)
    // - Show without negative sign
    const currentValue = await amountField.inputValue();
    
    // Verify negative value is rejected or converted
    const isNegativeRejected = currentValue === '' || !currentValue.includes('-') || currentValue.match(/^\$?\d/);
    expect(isNegativeRejected).toBeTruthy();

    // 3. Verify error message or that Pay button is disabled without valid amount
    if (currentValue === '' || currentValue === '$0.00') {
      // No valid amount entered
      const payButton = page.locator('[data-test="transaction-create-submit-payment"]');
      await expect(payButton).toBeDisabled();
    } else {
      // Valid positive amount was set, button should be enabled
      const payButton = page.locator('[data-test="transaction-create-submit-payment"]');
      await expect(payButton).toBeEnabled();
    }
  });
});
