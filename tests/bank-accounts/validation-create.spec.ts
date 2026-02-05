// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Bank Accounts Management', () => {
  test('User cannot create bank account with empty required fields', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Click 'Bank Accounts' and then 'Create'
    await page.locator('[data-test="sidenav-bankaccounts"]').click();
    await expect(page).toHaveURL(/bankaccounts/);

    const createButton = page.getByRole('button', { name: 'Create' });
    await createButton.click();

    // Verify Create Bank Account form is displayed
    await expect(page).toHaveURL(/bankaccounts\/new/);

    // 2. Leave all fields empty and try to click 'Save'
    const saveButton = page.locator('[data-test*="bank-account-submit"], button:has-text("Save")');
    
    // Check if Save button is disabled
    if (await saveButton.isDisabled()) {
      // Button should be disabled for empty required fields
      await expect(saveButton).toBeDisabled();
    } else {
      // If enabled, click and expect validation errors
      await saveButton.click();
      
      // Validation error messages should appear
      await expect(page.locator('[role="alert"], .error, [class*="error"]')).toBeVisible();
    }

    // 3. Fill in Bank Name but leave other fields empty
    const bankNameField = page.getByRole('textbox', { name: /Bank.*Name/ });
    await bankNameField.fill('Test Bank');
    
    // Save button should still be disabled or errors persist
    if (await saveButton.isDisabled().catch(() => false)) {
      await expect(saveButton).toBeDisabled();
    } else {
      // Try to save with partial data
      await saveButton.click();
      
      // Expect validation errors for missing fields
      const errorElements = page.locator('[role="alert"], .error, [class*="error"]');
      expect(await errorElements.count()).toBeGreaterThan(0);
    }
  });
});
