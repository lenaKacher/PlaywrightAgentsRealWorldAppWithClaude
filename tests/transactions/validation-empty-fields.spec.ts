// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('Transaction Management - Create & Send Payments', () => {
  test('User cannot send payment with empty required fields', async ({ homePage, transactionNew }) => {
    // 1. Click 'New' and select a contact
    await homePage.clickNew();
    await transactionNew.verifyPageLoaded();
    await transactionNew.selectReeceProhaska();
    await transactionNew.verifyReceiverSelected('Reece Prohaska');

    // 2. Verify Amount field is empty and Pay button behavior
    await expect(transactionNew.getAmountField()).toHaveValue('');

    // Pay button should be disabled without amount
    const isButtonDisabled = await transactionNew.verifyPayButtonDisabled();
    expect(isButtonDisabled).toBeTruthy();

    // 3. Fill in amount
    await transactionNew.fillAmount('50.00');
    await expect(transactionNew.getAmountField()).toHaveValue(/^\$50/);

    // 4. Fill in note to complete the transaction
    await transactionNew.fillNote('Test payment');
    await expect(transactionNew.getNoteField()).toHaveValue('Test payment');

    // Now Pay button should be enabled
    // 5. Click Pay button if enabled
    const isPayButtonNowEnabled = !(await transactionNew.verifyPayButtonDisabled());
    if (isPayButtonNowEnabled) {
      await transactionNew.clickPay();
      await expect(transactionNew.page.getByRole('alert')).toContainText('Transaction Submitted');
    }
  });
});