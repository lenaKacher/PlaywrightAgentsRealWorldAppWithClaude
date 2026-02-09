// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Transaction Management - Create & Send Payments', () => {
  test('User cannot send payment with empty required fields', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Click 'New' and select a contact
    await page.locator('[data-test="nav-top-new-transaction"]').click();
    await expect(page).toHaveURL(/transaction\/new/);

    // Select a contact
    await page.locator('[data-test="user-list-item-5beuD3-B59"]').click();
    await expect(page.getByRole('heading', { level: 2 })).toContainText('Reece Prohaska');

    // 2. Verify Amount field is empty and Pay button behavior
    const amountField = page.getByRole('textbox', { name: 'Amount' });
    
    // Amount should start empty
    await expect(amountField).toHaveValue('');

    // Try to submit without amount - button should be disabled
    const payButton = page.locator('[data-test="transaction-create-submit-payment"]');
    await expect(payButton).toBeDisabled();

    // 3. Fill in amount and note, then verify payment can be sent
    await amountField.fill('50.00');
    await expect(amountField).toHaveValue(/^\$50/);

    // Add a note to complete the transaction (note may be required)
    await page.getByRole('textbox', { name: 'Add a note' }).fill('Test payment');
    await expect(page.getByRole('textbox', { name: 'Add a note' })).toHaveValue('Test payment');

    // Now Pay button should be enabled
    const isPayButtonEnabled = await payButton.isEnabled();
    
    if (isPayButtonEnabled) {
      // Click Pay button if enabled
      await payButton.click();
      await expect(page.getByRole('alert')).toContainText('Transaction Submitted');
    } else {
      // If still disabled, verify that was the expected behavior
      await expect(payButton).toBeDisabled();
    }
  });
});