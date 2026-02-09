import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Sidebar navigation page object
 */
export class SidebarPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Click on Home button in sidebar
   */
  async clickHome() {
    await this.page.getByRole('button', { name: 'Home' }).click();
  }

  /**
   * Click on My Account button in sidebar
   */
  async clickMyAccount() {
    await this.page.getByRole('button', { name: 'My Account' }).click();
  }

  /**
   * Click on Bank Accounts button in sidebar
   */
  async clickBankAccounts() {
    await this.page.getByRole('button', { name: 'Bank Accounts' }).click();
  }

  /**
   * Click on Notifications button in sidebar
   */
  async clickNotifications() {
    await this.page.getByRole('button', { name: 'Notifications' }).click();
  }

  /**
   * Click on Logout button in sidebar
   */
  async clickLogout() {
    await this.page.getByRole('button', { name: 'Logout' }).click();
  }

  /**
   * Get user profile info from sidebar
   */
  async getUserProfileInfo() {
    const avatar = this.page.locator('img[alt*="Solon_Robel60"]');
    const nameElement = this.page.locator('heading[level="6"]:has-text("Lenore L S")');
    const handleElement = this.page.locator('heading[level="6"]:has-text("@Solon_Robel60")');
    const balanceElement = this.page.locator('heading[level="6"]:has-text("Account Balance")');

    return {
      avatar,
      nameElement,
      handleElement,
      balanceElement,
    };
  }

  /**
   * Verify sidebar is visible
   */
  async verifySidebarVisible() {
    await expect(this.page.getByRole('button', { name: 'Home' })).toBeVisible();
  }
}
