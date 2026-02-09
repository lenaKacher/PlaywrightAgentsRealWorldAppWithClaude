import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * User Profile page object (sidebar profile section)
 */
export class UserProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Get user avatar element
   */
  getUserAvatar() {
    return this.page.locator('img[alt*="Solon_Robel60"]');
  }

  /**
   * Get user name element
   */
  getUserName() {
    return this.page.locator('text=Lenore L S');
  }

  /**
   * Get user handle element
   */
  getUserHandle() {
    return this.page.locator('text=@Solon_Robel60');
  }

  /**
   * Get account balance element
   */
  getAccountBalance() {
    return this.page.locator('text=$671.31');
  }

  /**
   * Verify user avatar is visible
   */
  async verifyAvatarVisible() {
    await expect(this.getUserAvatar()).toBeVisible();
  }

  /**
   * Verify user name is visible
   */
  async verifyUserNameVisible() {
    await expect(this.getUserName()).toBeVisible();
  }

  /**
   * Verify user handle is visible
   */
  async verifyUserHandleVisible() {
    await expect(this.getUserHandle()).toBeVisible();
  }

  /**
   * Verify account balance is visible
   */
  async verifyAccountBalanceVisible() {
    await expect(this.getAccountBalance()).toBeVisible();
  }

  /**
   * Verify all profile information is visible
   */
  async verifyAllProfileInfoVisible() {
    await this.verifyAvatarVisible();
    await this.verifyUserNameVisible();
    await this.verifyUserHandleVisible();
    await this.verifyAccountBalanceVisible();
  }

  /**
   * Get profile section
   */
  getProfileSection() {
    return this.page.locator('img[alt*="Solon_Robel60"]').locator('..');
  }

  /**
   * Verify profile section is visible
   */
  async verifyProfileSectionVisible() {
    await expect(this.getProfileSection()).toBeVisible();
  }
}
