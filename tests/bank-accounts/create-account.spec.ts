// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('Bank Accounts Management', () => {
  test('User can create a new bank account', async ({ sidebar, bankAccounts, createBankAccount }) => {
    // 1. Navigate to Bank Accounts page
    await sidebar.clickBankAccounts();
    await bankAccounts.verifyPageLoaded();

    // 2. Click 'Create' button
    await bankAccounts.clickCreate();
    await createBankAccount.verifyPageLoaded();

    // 3. Enter bank account details
    await createBankAccount.fillBankName('My Test Bank');
    await expect(createBankAccount.getBankNameField()).toHaveValue('My Test Bank');

    // 4. Enter routing number
    await createBankAccount.fillRoutingNumber('021000021');
    await expect(createBankAccount.getRoutingNumberField()).toHaveValue('021000021');

    // 5. Enter account number
    await createBankAccount.fillAccountNumber('0123456789');
    await expect(createBankAccount.getAccountNumberField()).toHaveValue('0123456789');

    // 6. Click 'Save' button
    await createBankAccount.clickSave();

    // Verify success and return to Bank Accounts list
    await bankAccounts.verifyPageLoaded();
    
    // Verify new account appears in the list
    await expect(bankAccounts.page.locator('text=My Test Bank').first()).toBeVisible();
  });
});