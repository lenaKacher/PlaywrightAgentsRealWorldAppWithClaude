// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/pageObjects';

test.describe('Notifications', () => {
  test('User can view notifications and dismiss them', async ({ sidebar, notifications }) => {
    // 1. Click 'Notifications' button in sidebar
    await sidebar.clickNotifications();

    // 2. Verify Notifications page is displayed
    await notifications.verifyPageLoaded();

    // 3. Check if there are notifications
    const hasNotifications = await notifications.hasNotifications();
    
    if (hasNotifications) {
      // If there are notifications, verify them
      const paymentCount = await notifications.getNotificationCount();
      expect(paymentCount).toBeGreaterThan(0);
      
      // Verify payment text is visible
      const paymentVisible = await notifications.verifyPaymentTextVisible();
      expect(paymentVisible).toBeTruthy();

      // 4. Dismiss first notification
      await notifications.dismissFirstNotification();
    } else {
      // If no notifications, verify empty state
      await notifications.verifyEmptyState();
    }
  });
});
