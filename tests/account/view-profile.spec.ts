// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('User Account Management', () => {
  test('User can view their account profile information', async ({ userProfile }) => {
    // Views user profile section in the sidebar

    // 1. Verify user avatar is displayed
    await userProfile.verifyAvatarVisible();

    // 2. Verify user's full name is shown
    await userProfile.verifyUserNameVisible();

    // 3. Verify user's handle is shown
    await userProfile.verifyUserHandleVisible();

    // 4. Verify account balance is displayed
    await userProfile.verifyAccountBalanceVisible();

    // 5. Verify all profile information is visible together
    await userProfile.verifyProfileSectionVisible();

    // 6. Final verification that all info is visible
    await userProfile.verifyAllProfileInfoVisible();
  });
});
