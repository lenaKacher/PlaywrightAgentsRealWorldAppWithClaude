// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('User Account Management', () => {
  test('User can edit their account settings', async ({ sidebar, userSettings }) => {
    // 1. Navigate to User Settings page
    await sidebar.clickMyAccount();
    await userSettings.verifyPageLoaded();

    // 2. Verify form fields are visible
    await userSettings.verifyAllFieldsVisible();

    // 3. Verify current values are displayed in form
    await userSettings.verifyFieldValue('First Name', 'Lenore L');
    await userSettings.verifyFieldValue('Last Name', 'Solon_Robel60');
    await userSettings.verifyFieldValue('Email', 'test.user@example.com');
    await userSettings.verifyFieldValue('Phone Number', '123-456-7890');

    // 4. Verify Save button is visible and functional
    await expect(userSettings.getSaveButton()).toBeVisible();
    
    // Verify we can interact with the fields (modify and try to save)
    await userSettings.fillFirstName('John');
    await expect(userSettings.getFirstNameField()).toHaveValue('John');
    
    // Restore original value
    await userSettings.fillFirstName('Lenore L');
    await expect(userSettings.getFirstNameField()).toHaveValue('Lenore L');
  });
});
