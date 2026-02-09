// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('Transaction Management - Create & Send Payments', () => {
  test('User can create and send a payment transaction successfully', async ({ homePage, transactionNew }) => {
    // 1. Click the 'New' button to create a new transaction
    await homePage.clickNew();
    await transactionNew.verifyPageLoaded();

    // 2. Select 'Reece Prohaska' from the contact list
    await transactionNew.selectReeceProhaska();
    await transactionNew.verifyReceiverSelected('Reece Prohaska');

    // 3. Enter amount '75.50' in the Amount field
    await transactionNew.fillAmount('75.50');
    await expect(transactionNew.getAmountField()).toHaveValue('$75.50');

    // 4. Enter 'Dinner payment' in the note field
    await transactionNew.fillNote('Dinner payment');
    await expect(transactionNew.getNoteField()).toHaveValue('Dinner payment');

    // 5. Click the 'Pay' button to complete the payment transaction
    await transactionNew.clickPay();
    await expect(transactionNew.page.getByRole('alert')).toContainText('Transaction Submitted');

    // Click Return to Transactions button to navigate back to home
    await transactionNew.page.getByRole('button', { name: /Return To Transactions/ }).click();
    
    // Wait for navigation back to home page
    await transactionNew.page.waitForURL(/\/$/, { timeout: 5000 });

    // 6. Return to transactions and verify the transaction was created
    await homePage.verifyPageLoaded();
    await homePage.verifyGridVisible();
    
    // Verify the transaction is at the top of the list
    const firstTransaction = homePage.getFirstTransactionItem();
    await expect(firstTransaction.locator('text=Dinner payment')).toBeVisible();
  });
});