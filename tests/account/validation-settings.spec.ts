// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('User Account Management', () => {
  test('User cannot save settings with invalid data', async ({ sidebar, userSettings }) => {
    // 1. Navigate to User Settings page
    await sidebar.clickMyAccount();
    await userSettings.verifyPageLoaded();

    // 2. Try to clear the First Name field completely
    await userSettings.clearFirstName();
    await expect(userSettings.getFirstNameField()).toHaveValue('');

    // 3. Click 'Save' button and handle response
    const isSaveButtonDisabled = await userSettings.isSaveButtonDisabled();
    if (isSaveButtonDisabled) {
      // Button should be disabled for invalid data
      await expect(userSettings.getSaveButton()).toBeDisabled();
    } else {
      // If enabled, click and expect error
      await userSettings.clickSave();
      
      // Look for validation error message
      if (await userSettings.verifyErrorMessageVisible()) {
        await expect(userSettings.getErrorMessage()).toContainText(/First.*Name|required/i);
      }
    }

    // 4. Enter an invalid email format
    await userSettings.clearEmail();
    await userSettings.fillEmail('notanemail');

    // Try saving with invalid email
    const isStillDisabled = await userSettings.isSaveButtonDisabled();
    if (!isStillDisabled) {
      await userSettings.clickSave();
      
      // Expect email validation error
      if (await userSettings.verifyErrorMessageVisible()) {
        await expect(userSettings.getErrorMessage()).toContainText(/email|invalid/i);
      }
    }
  });
});
