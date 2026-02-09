import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Bank Accounts page object
 */
export class BankAccountsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Get the page heading
   */
  getPageHeading() {
    return this.page.getByRole('heading', { name: 'Bank Accounts', exact: true });
  }

  /**
   * Get Create button
   */
  getCreateButton() {
    return this.page.getByRole('button', { name: 'Create' });
  }

  /**
   * Get bank account items by checking for deleted accounts
   */
  getDeletedAccountItem() {
    return this.page.locator('text=Deleted').first();
  }

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded() {
    await this.verifyURL(/bankaccounts/);
    await expect(this.getPageHeading()).toBeVisible();
  }

  /**
   * Verify Create button is visible and enabled
   */
  async verifyCreateButtonVisible() {
    await expect(this.getCreateButton()).toBeVisible();
    await expect(this.getCreateButton()).toBeEnabled();
  }

  /**
   * Verify bank accounts list has items
   */
  async verifyAccountsListVisible() {
    await expect(this.getDeletedAccountItem()).toBeVisible();
  }

  /**
   * Click Create button to create new account
   */
  async clickCreate() {
    await this.getCreateButton().click();
  }
}
