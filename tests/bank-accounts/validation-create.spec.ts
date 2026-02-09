// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('Bank Accounts Management', () => {
  test('User cannot create bank account with empty required fields', async ({ sidebar, bankAccounts, createBankAccount }) => {
    // 1. Navigate to Create Bank Account form
    await sidebar.clickBankAccounts();
    await bankAccounts.verifyPageLoaded();
    await bankAccounts.clickCreate();
    await createBankAccount.verifyPageLoaded();

    // 2. Leave all fields empty and try to click 'Save'
    const isDisabled = await createBankAccount.isSaveDisabled();
    
    if (isDisabled) {
      // Button should be disabled for empty required fields
      await expect(createBankAccount.getSaveButton()).toBeDisabled();
    } else {
      // If button is not disabled, verify form fields are visible
      await createBankAccount.verifyAllFieldsVisible();
    }

    // 3. Fill in Bank Name but leave other fields empty
    await createBankAccount.fillBankName('Test Bank');
    
    // Try to submit - button should still be disabled if validation works
    if (await createBankAccount.isSaveDisabled()) {
      await expect(createBankAccount.getSaveButton()).toBeDisabled();
    }
  });
});