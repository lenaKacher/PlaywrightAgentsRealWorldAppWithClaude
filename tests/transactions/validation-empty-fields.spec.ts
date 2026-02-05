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

    // 3. Fill in amount '50' and verify form can be submitted with just amount
    await amountField.fill('50');
    await expect(amountField).toHaveValue('$50.00');

    // Now Pay button should be enabled (note is optional)
    await expect(payButton).toBeEnabled();

    // Add a note to complete the transaction
    await page.getByRole('textbox', { name: 'Add a note' }).fill('Test payment');

    // Click Pay button
    await payButton.click();
    await expect(page.getByRole('alert')).toContainText('Transaction Submitted');
  });
});
