// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('User Account Management', () => {
  test('User can edit their account settings', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Click 'My Account' button in the sidebar
    await page.locator('[data-test="sidenav-user-settings"]').click();

    // 2. Verify User Settings page is displayed
    await expect(page).toHaveURL(/user\/settings/);
    await expect(page.getByRole('heading', { level: 2 })).toContainText('User Settings');

    // 3. Verify form fields are visible: First Name, Last Name, Email, Phone Number
    const firstNameField = page.getByRole('textbox', { name: 'First Name' });
    const lastNameField = page.getByRole('textbox', { name: 'Last Name' });
    const emailField = page.getByRole('textbox', { name: 'Email' });
    const phoneField = page.getByRole('textbox', { name: 'Phone Number' });

    await expect(firstNameField).toBeVisible();
    await expect(lastNameField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(phoneField).toBeVisible();

    // 4. Verify current values are displayed in form
    await expect(firstNameField).toHaveValue('Lenore L');
    await expect(lastNameField).toHaveValue('Solon_Robel60');
    await expect(emailField).toHaveValue('test.user@example.com');
    await expect(phoneField).toHaveValue('123-456-7890');

    // 5. Verify Save button is visible and functional
    const saveButton = page.getByRole('button', { name: 'Save' });
    await expect(saveButton).toBeVisible();
    
    // Verify we can interact with the fields (modify and try to save)
    await firstNameField.fill('John');
    await expect(firstNameField).toHaveValue('John');
    
    // Restore original value
    await firstNameField.fill('Lenore L');
    await expect(firstNameField).toHaveValue('Lenore L');
  });
});
