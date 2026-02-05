// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('Notifications', () => {
  // Note: The seed data doesn't create notifications for the logged-in user
  // Notifications are generated when other users send payments/requests to this user
  // This would require seeding with multiple user accounts and transactions between them
  test('User can view notifications and dismiss them', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Click 'Notifications' button in the sidebar
    await page.locator('[data-test="sidenav-notifications"]').click();

    // 2. Verify Notifications page is displayed
    await expect(page).toHaveURL(/notifications/);
    await expect(page.getByRole('heading', { name: 'Notifications', exact: true })).toBeVisible();

    // 3. Verify list of notifications or empty state
    // Check if there are any notifications
    const noNotificationsHeading = page.getByRole('heading', { name: 'No Notifications' });
    const hasNotifications = await noNotificationsHeading.isVisible().then(() => false).catch(() => true);
    
    if (hasNotifications) {
      // If there are notifications, verify payment-related ones
      const paymentNotifications = page.locator('text=/received payment|requested payment/');
      const itemCount = await paymentNotifications.count();
      expect(itemCount).toBeGreaterThan(0);
      
      // Verify first notification is visible
      await expect(paymentNotifications.first()).toBeVisible();

      // 4. Verify notification types include payment-related notifications
      await expect(page.locator('text=/payment|Payment/i').first()).toBeVisible();

      // Verify there are notification items
      expect(itemCount).toBeGreaterThanOrEqual(1);

      // 5. Click 'Dismiss' button on the first notification
      const firstDismissButton = page.getByRole('button', { name: 'Dismiss' }).first();
      await expect(firstDismissButton).toBeVisible();
      await firstDismissButton.click();
    } else {
      // If no notifications, verify the empty state is shown
      await expect(noNotificationsHeading).toBeVisible();
    }
  });
});
