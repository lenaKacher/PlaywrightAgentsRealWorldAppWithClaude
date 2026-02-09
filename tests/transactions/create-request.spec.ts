// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('Transaction Management - Create & Send Payments', () => {
  test('User can create and send a payment request transaction', async ({ homePage, transactionNew }) => {
    // 1. Click the 'New' button to create a new transaction
    await homePage.clickNew();
    await transactionNew.verifyPageLoaded();

    // 2. Select 'April Stracke' from the contact list
    await transactionNew.selectAprilStracke();
    await transactionNew.verifyReceiverSelected('April Stracke');

    // 3. Enter amount '125.00' in the Amount field
    await transactionNew.fillAmount('125.00');
    await expect(transactionNew.getAmountField()).toHaveValue('$125.00');

    // 4. Enter 'Loan repayment' in the note field
    await transactionNew.fillNote('Loan repayment');
    await expect(transactionNew.getNoteField()).toHaveValue('Loan repayment');

    // 5. Click the 'Request' button to create a payment request
    await transactionNew.clickRequest();
    await expect(transactionNew.page.getByRole('alert')).toContainText('Transaction Submitted');
    
    // Click Return to Transactions button to navigate back to home
    await transactionNew.page.getByRole('button', { name: /Return To Transactions/ }).click();
    
    // Wait for navigation back to home page
    await transactionNew.page.waitForURL(/\/$/, { timeout: 5000 });

    // 6. Return to transactions and verify the transaction was created
    await homePage.verifyPageLoaded();
    await homePage.verifyGridVisible();
  });
});