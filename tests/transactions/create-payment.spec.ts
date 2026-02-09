// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Transaction Management - Create & Send Payments', () => {
  test('User can create and send a payment transaction successfully', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Click the 'New' button in the top navigation to create a new transaction
    await page.locator('[data-test="nav-top-new-transaction"]').click();
    await expect(page).toHaveURL(/transaction\/new/);

    // 2. Select 'Reece Prohaska' from the contact list
    await page.locator('[data-test="user-list-item-5beuD3-B59"]').click();
    await expect(page.getByRole('heading', { level: 2 })).toContainText('Reece Prohaska');

    // 3. Enter amount '75.50' in the Amount field
    await page.getByRole('textbox', { name: 'Amount' }).fill('75.50');
    await expect(page.getByRole('textbox', { name: 'Amount' })).toHaveValue('$75.50');

    // 4. Enter 'Dinner payment' in the note field
    await page.getByRole('textbox', { name: 'Add a note' }).fill('Dinner payment');
    await expect(page.getByRole('textbox', { name: 'Add a note' })).toHaveValue('Dinner payment');

    // 5. Click the 'Pay' button to complete the payment transaction
    await page.locator('[data-test="transaction-create-submit-payment"]').click();
    await expect(page.getByRole('alert')).toContainText('Transaction Submitted');

    // 6. Click 'Return To Transactions' to verify the transaction was created and added to the list
    await page.locator('[data-test="new-transaction-return-to-transactions"]').click();
    
    // Verify transaction appears in the list with correct details
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('[role="grid"]')).toBeVisible();
    
    // Verify the transaction is at the top of the list with the correct amount and note
    const firstTransaction = page.locator('[role="grid"] >> [data-test^="transaction-item-"]').first();
    await expect(firstTransaction.locator('text=Dinner payment')).toBeVisible();
    await expect(firstTransaction.locator('text=-$75.50')).toBeVisible();
    await expect(firstTransaction.locator('text=Lenore L Solon_Robel60 paid Reece Prohaska')).toBeVisible();
  });
});