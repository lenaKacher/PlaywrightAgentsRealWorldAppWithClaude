// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('Bank Accounts Management', () => {
  test('User can view bank accounts list', async ({ sidebar, bankAccounts }) => {
    // 1. Click 'Bank Accounts' button in the sidebar
    await sidebar.clickBankAccounts();

    // 2. Verify Bank Accounts page is displayed
    await bankAccounts.verifyPageLoaded();

    // 3. Verify list of bank accounts is visible
    await bankAccounts.verifyAccountsListVisible();
    
    // 4. Verify 'Create' button is visible for adding new accounts
    await bankAccounts.verifyCreateButtonVisible();
  });
});