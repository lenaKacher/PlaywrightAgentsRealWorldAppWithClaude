// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Transaction Filtering & Tabs', () => {
  test('User can switch between transaction view tabs: Everyone, Friends, Mine', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Verify 'Everyone' tab is selected by default
    const everyoneTab = page.locator('[data-test="nav-public-tab"]');
    await expect(everyoneTab).toHaveAttribute('aria-selected', 'true');

    // 2. Verify transaction list shows all transactions with label 'Public'
    await expect(page.locator('text=Public')).toBeVisible();
    await expect(page.locator('[role="grid"]')).toBeVisible();

    // 3. Click on 'Friends' tab to switch views
    await page.locator('[data-test="nav-contacts-tab"]').click();

    // 4. Verify 'Friends' tab becomes active and list updates with label 'Contacts'
    const friendsTab = page.locator('[data-test="nav-contacts-tab"]');
    await expect(friendsTab).toHaveAttribute('aria-selected', 'true');
    await expect(page).toHaveURL(/contacts/);
    await expect(page.locator('text=Contacts')).toBeVisible();

    // Verify the transaction list changed
    const contactsGrid = page.locator('[role="grid"]');
    await expect(contactsGrid).toBeVisible();

    // 5. Click on 'Mine' tab to switch views
    await page.locator('[data-test="nav-personal-tab"]').click();

    // 6. Verify 'Mine' tab becomes active and list updates with label 'Personal'
    const mineTab = page.locator('[data-test="nav-personal-tab"]');
    await expect(mineTab).toHaveAttribute('aria-selected', 'true');
    await expect(page).toHaveURL(/personal/);
    await expect(page.locator('text=Personal')).toBeVisible();

    // Verify the personal transaction list is displayed
    const personalGrid = page.locator('[role="grid"]');
    await expect(personalGrid).toBeVisible();

    // 7. Return to 'Everyone' tab and verify it's active
    await page.locator('[data-test="nav-public-tab"]').click();
    
    await expect(everyoneTab).toHaveAttribute('aria-selected', 'true');
    await expect(page).toHaveURL(/\/transactions|\/$/);
    await expect(page.locator('text=Public')).toBeVisible();
  });
});
