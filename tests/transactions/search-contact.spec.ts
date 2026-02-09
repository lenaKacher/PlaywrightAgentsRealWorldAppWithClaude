// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('Transaction Management - Create & Send Payments', () => {
  test('User can search for and select contact from contact list', async ({ homePage, transactionNew }) => {
    // 1. Click the 'New' button to start transaction creation
    await homePage.clickNew();
    await transactionNew.verifyPageLoaded();

    // 2. Search for 'Klaus' in contact list
    await transactionNew.searchContact('Klaus');
    await expect(transactionNew.getSearchInput()).toHaveValue('Klaus');

    // 3. Verify Klaus contact appears and select it
    const klauContact = transactionNew.getContactByDataTest('user-list-item-uV0xLLxBW');
    await expect(klauContact).toBeVisible();
    
    await klauContact.click();
    
    // Verify contact is selected
    await transactionNew.verifyReceiverSelected('Klaus');
  });
});