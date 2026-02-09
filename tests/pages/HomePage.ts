import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Home page / Transaction list page object
 */
export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Get New button in navigation
   */
  getNewButton() {
    return this.page.locator('[data-test="nav-top-new-transaction"]');
  }

  /**
   * Get transaction grid
   */
  getTransactionGrid() {
    return this.page.locator('[role="grid"]');
  }

  /**
   * Get first transaction item
   */
  getFirstTransactionItem() {
    return this.page.locator('[role="grid"] >> [data-test^="transaction-item-"]').first();
  }

  /**
   * Get transaction items
   */
  getTransactionItems() {
    return this.page.locator('[role="grid"] >> [data-test^="transaction-item-"]');
  }

  /**
   * Get tab by name
   */
  getTab(tabName: 'Everyone' | 'Friends' | 'Mine') {
    return this.page.getByRole('tab', { name: tabName, exact: true });
  }

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded() {
    await this.verifyURL(/\/$/);
  }

  /**
   * Click new transaction button
   */
  async clickNew() {
    await this.getNewButton().click();
  }

  /**
   * Click on first transaction
   */
  async clickFirstTransaction() {
    await this.getFirstTransactionItem().click();
  }

  /**
   * Verify transaction grid is visible
   */
  async verifyGridVisible() {
    await expect(this.getTransactionGrid()).toBeVisible();
  }

  /**
   * Click tab
   */
  async clickTab(tabName: 'Everyone' | 'Friends' | 'Mine') {
    await this.getTab(tabName).click();
  }

  /**
   * Verify tab is active
   */
  async verifyTabActive(tabName: 'Everyone' | 'Friends' | 'Mine') {
    const tab = this.getTab(tabName);
    await expect(tab).toHaveAttribute('aria-selected', 'true');
  }

  /**
   * Get transaction item count
   */
  async getTransactionCount(): Promise<number> {
    return this.getTransactionItems().count();
  }
}
