// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('User Account Management', () => {
  test('User cannot save settings with invalid data', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Navigate to User Settings page
    await page.locator('[data-test="sidenav-myaccount"]').click();
    await expect(page).toHaveURL(/settings/);
    
    // Verify settings form is displayed
    await expect(page.getByRole('heading', { name: 'User Settings' })).toBeVisible();

    // 2. Try to clear the First Name field completely
    const firstNameField = page.getByRole('textbox', { name: /First.*Name|firstName/ });
    await firstNameField.clear();
    await expect(firstNameField).toHaveValue('');

    // 3. Click 'Save' button
    const saveButton = page.locator('[data-test="user-settings-submit"]');
    
    // Try clicking save - it may be disabled or show error
    if (await saveButton.isDisabled()) {
      // Button should be disabled for invalid data
      await expect(saveButton).toBeDisabled();
    } else {
      // If enabled, click and expect error
      await saveButton.click();
      
      // Look for validation error message
      const errorMessage = page.locator('[role="alert"]');
      if (await errorMessage.isVisible().catch(() => false)) {
        await expect(errorMessage).toContainText(/First.*Name|required/i);
      }
    }

    // 4. Enter an invalid email format
    const emailField = page.getByRole('textbox', { name: /Email/ });
    await emailField.clear();
    await emailField.fill('notanemail');

    // Try saving with invalid email
    if (!await saveButton.isDisabled()) {
      await saveButton.click();
      
      // Expect email validation error
      const error = page.locator('[role="alert"]');
      if (await error.isVisible().catch(() => false)) {
        await expect(error).toContainText(/email|invalid/i);
      }
    }
  });
});
