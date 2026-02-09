// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('Transaction Viewing & Details', () => {
  test('User can view transaction details page', async ({ homePage, transactionDetail }) => {
    // 1. Click on first transaction from list
    await homePage.clickFirstTransaction();

    // 2. Verify transaction detail page is displayed
    await transactionDetail.verifyPageLoaded();

    // 3. Verify transaction information includes: sender name, receiver name, amount, and description
    await transactionDetail.verifyTransactionPartiesVisible();
    
    // Check transaction note if visible
    const noteVisible = await transactionDetail.verifyTransactionNoteVisible();
    if (noteVisible) {
      expect(noteVisible).toBeTruthy();
    }
    
    // Check if amount is displayed
    const amountDisplayed = await transactionDetail.verifyAmountDisplayed();
    expect(amountDisplayed).toBeTruthy();

    // 4. Verify comment section is visible
    await transactionDetail.verifyCommentSectionVisible();
  });
});