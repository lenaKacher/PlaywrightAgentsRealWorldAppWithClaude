import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Notifications page object
 */
export class NotificationsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Get page heading
   */
  getPageHeading() {
    return this.page.getByRole('heading', { name: 'Notifications', exact: true });
  }

  /**
   * Get "No Notifications" heading (when empty)
   */
  getNoNotificationsHeading() {
    return this.page.getByRole('heading', { name: 'No Notifications' });
  }

  /**
   * Get payment notifications
   */
  getPaymentNotifications() {
    return this.page.locator('text=/received payment|requested payment/');
  }

  /**
   * Get payment text (generic)
   */
  getPaymentText() {
    return this.page.locator('text=/payment|Payment/i').first();
  }

  /**
   * Get Dismiss button
   */
  getDismissButton() {
    return this.page.getByRole('button', { name: 'Dismiss' }).first();
  }

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded() {
    await this.verifyURL(/notifications/);
    await expect(this.getPageHeading()).toBeVisible();
  }

  /**
   * Check if there are notifications
   */
  async hasNotifications(): Promise<boolean> {
    return this.getNoNotificationsHeading()
      .isVisible()
      .then(() => false) // If "No Notifications" is visible, there are no notifications
      .catch(() => true); // If not found, there are notifications
  }

  /**
   * Get notification count
   */
  async getNotificationCount(): Promise<number> {
    return this.getPaymentNotifications().count();
  }

  /**
   * Verify payment notifications are visible
   */
  async verifyPaymentNotificationsVisible(): Promise<boolean> {
    const count = await this.getNotificationCount();
    return count > 0;
  }

  /**
   * Verify payment text is visible
   */
  async verifyPaymentTextVisible(): Promise<boolean> {
    return this.getPaymentText().isVisible().catch(() => false);
  }

  /**
   * Verify empty state
   */
  async verifyEmptyState() {
    await expect(this.getNoNotificationsHeading()).toBeVisible();
  }

  /**
   * Dismiss first notification
   */
  async dismissFirstNotification() {
    const button = this.getDismissButton();
    if (await button.isVisible().catch(() => false)) {
      await button.click();
    }
  }
}
