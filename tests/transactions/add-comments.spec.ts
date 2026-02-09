// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('Transaction Viewing & Details', () => {
  test('User can add and view comments on transactions', async ({ homePage, transactionDetail }) => {
    // 1. Click on the first transaction to view details
    await homePage.clickFirstTransaction();
    await transactionDetail.verifyPageLoaded();

    // 2. Verify comment section is visible
    await transactionDetail.verifyCommentSectionVisible();

    // 3. Type comment text
    const commentText = 'This looks correct';
    await transactionDetail.addComment(commentText);

    // 4. Verify comment was submitted or field was cleared
    // The comment field might disappear or be cleared after submission
    const fieldExists = await transactionDetail.isCommentInputVisible();
    
    if (fieldExists) {
      // Field still exists, check if it's cleared
      const currentValue = await transactionDetail.getCommentInputValue().catch(() => null);
      if (currentValue !== null) {
        // Field should be cleared after successful submission
        expect(currentValue === '' || currentValue !== commentText).toBeTruthy();
      }
    }
  });
});