// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('Transaction Viewing & Details', () => {
  test('User can navigate back from transaction detail to transaction list', async ({ sidebar, homePage, transactionDetail }) => {
    // 1. Click on first transaction to view details
    await homePage.clickFirstTransaction();
    await transactionDetail.verifyPageLoaded();

    // 2. Click 'Home' button in sidebar to navigate back
    await sidebar.clickHome();

    // Verify navigation returns to home/transaction list
    await homePage.verifyPageLoaded();
    await homePage.verifyGridVisible();
  });
});