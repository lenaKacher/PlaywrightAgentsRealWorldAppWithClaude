// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Transaction Management - Create & Send Payments', () => {
  test('User can clear and re-enter transaction data', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Click 'New' and select a contact
    await page.locator('[data-test="nav-top-new-transaction"]').click();
    await expect(page).toHaveURL(/transaction\/new/);

    await page.locator('[data-test="user-list-item-5beuD3-B59"]').click();
    await expect(page.getByRole('heading', { level: 2 })).toContainText('Reece Prohaska');

    // 2. Enter amount '100' in Amount field
    const amountField = page.getByRole('textbox', { name: 'Amount' });
    await amountField.fill('100');
    await expect(amountField).toHaveValue(/^\$100/);

    // 3. Clear the Amount field and enter '75' instead
    await amountField.clear();
    await amountField.fill('75');
    await expect(amountField).toHaveValue(/^\$75/);

    // 4. Enter a note and click 'Pay'
    await page.getByRole('textbox', { name: 'Add a note' }).fill('Updated payment');
    await page.locator('[data-test="transaction-create-submit-payment"]').click();
    
    // Verify transaction is created with updated amount
    await expect(page.getByRole('alert')).toContainText('Transaction Submitted');
    await expect(page.getByRole('heading', { name: /Paid \$75\.00/ })).toBeVisible();
  });
});
