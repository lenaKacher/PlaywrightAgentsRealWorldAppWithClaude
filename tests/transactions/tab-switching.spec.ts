// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('Transaction Filtering & Tabs', () => {
  test('User can switch between transaction view tabs: Everyone, Friends, Mine', async ({ homePage }) => {
    // 1. Verify 'Everyone' tab is selected by default
    await homePage.verifyTabActiveByDataTest('nav-public-tab');

    // 2. Verify transaction list shows all transactions
    await homePage.verifyGridVisible();

    // 3. Click on 'Friends' tab to switch views
    await homePage.clickTabByDataTest('nav-contacts-tab');

    // 4. Verify 'Friends' tab becomes active
    await homePage.verifyTabActiveByDataTest('nav-contacts-tab');
    await homePage.verifyGridVisible();

    // 5. Click on 'Mine' tab to switch views
    await homePage.clickTabByDataTest('nav-personal-tab');

    // 6. Verify 'Mine' tab becomes active
    await homePage.verifyTabActiveByDataTest('nav-personal-tab');
    await homePage.verifyGridVisible();

    // 7. Return to 'Everyone' tab and verify it's active
    await homePage.clickTabByDataTest('nav-public-tab');
    await homePage.verifyTabActiveByDataTest('nav-public-tab');
  });
});