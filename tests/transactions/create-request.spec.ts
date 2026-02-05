// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Transaction Management - Create & Send Payments', () => {
  test('User can create and send a payment request transaction', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Click the 'New' button in the top navigation
    await page.locator('[data-test="nav-top-new-transaction"]').click();
    await expect(page).toHaveURL(/transaction\/new/);

    // 2. Select 'April Stracke' from the contact list
    await page.locator('[data-test="user-list-item-2vQ3zYpZAv"]').click();
    await expect(page.getByRole('heading', { level: 2 })).toContainText('April Stracke');

    // 3. Enter amount '125.00' in the Amount field
    await page.getByRole('textbox', { name: 'Amount' }).fill('125.00');
    await expect(page.getByRole('textbox', { name: 'Amount' })).toHaveValue('$125.00');

    // 4. Enter 'Loan repayment' in the note field
    await page.getByRole('textbox', { name: 'Add a note' }).fill('Loan repayment');
    await expect(page.getByRole('textbox', { name: 'Add a note' })).toHaveValue('Loan repayment');

    // 5. Click the 'Request' button to create a payment request
    await page.locator('[data-test="transaction-create-submit-request"]').click();
    await expect(page.getByRole('alert')).toContainText('Transaction Submitted');
    
    // Verify the completion screen shows the request was submitted
    await expect(page.getByRole('heading', { name: /Requested.*Loan repayment/ })).toBeVisible();

    // 6. Click 'Return To Transactions' to verify the transaction was created
    await page.locator('[data-test="new-transaction-return-to-transactions"]').click();
    
    // Verify we're back at the home page
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('[role="grid"]')).toBeVisible();
  });
});
