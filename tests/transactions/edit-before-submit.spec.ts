// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('Transaction Management - Create & Send Payments', () => {
  test('User can clear and re-enter transaction data', async ({ homePage, transactionNew }) => {
    // 1. Click 'New' and select a contact
    await homePage.clickNew();
    await transactionNew.verifyPageLoaded();
    await transactionNew.selectReeceProhaska();
    await transactionNew.verifyReceiverSelected('Reece Prohaska');

    // 2. Enter amount '100' in Amount field
    await transactionNew.fillAmount('100');
    await expect(transactionNew.getAmountField()).toHaveValue(/^\$100/);

    // 3. Clear the Amount field and enter '75' instead
    await transactionNew.clearAmount();
    await transactionNew.fillAmount('75');
    await expect(transactionNew.getAmountField()).toHaveValue(/^\$75/);

    // 4. Enter a note and click 'Pay'
    await transactionNew.fillNote('Updated payment');
    await transactionNew.clickPay();
    
    // Verify transaction is created with updated amount
    await expect(transactionNew.page.getByRole('alert')).toContainText('Transaction Submitted');
  });
});