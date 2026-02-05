// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Bank Accounts Management', () => {
  test('User can create a new bank account', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Click 'Bank Accounts' in sidebar
    await page.locator('[data-test="sidenav-bankaccounts"]').click();
    await expect(page).toHaveURL(/bankaccounts/);
    
    // Verify Bank Accounts list page is displayed
    await expect(page.getByRole('heading', { name: 'Bank Accounts', exact: true })).toBeVisible();

    // 2. Click 'Create' button
    const createButton = page.getByRole('button', { name: 'Create' });
    await createButton.click();

    // Verify Create Bank Account page is displayed
    await expect(page).toHaveURL(/bankaccounts\/new/);
    
    // Verify form fields are visible
    await expect(page.getByRole('heading', { name: /Bank/ })).toBeVisible();

    // 3. Enter 'My Test Bank' in Bank Name field
    const bankNameField = page.getByRole('textbox', { name: /Bank.*Name|bankName/ });
    await bankNameField.fill('My Test Bank');
    await expect(bankNameField).toHaveValue('My Test Bank');

    // 4. Enter '021000021' in Routing Number field
    const routingField = page.getByRole('textbox', { name: /Routing/ });
    await routingField.fill('021000021');
    await expect(routingField).toHaveValue('021000021');

    // 5. Enter '0123456789' in Account Number field
    const accountField = page.getByRole('textbox', { name: /Account/ });
    await accountField.fill('0123456789');
    await expect(accountField).toHaveValue('0123456789');

    // 6. Click 'Save' button
    const saveButton = page.locator('[data-test*="bank-account-submit"], button:has-text("Save")');
    await saveButton.click();

    // Verify success and return to Bank Accounts list
    await expect(page).toHaveURL(/bankaccounts$/);
    await expect(page.getByRole('heading', { name: 'Bank Accounts' })).toBeVisible();
    
    // Verify new account appears in the list
    await expect(page.locator('text=My Test Bank')).toBeVisible();
  });
});
