import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Transaction Detail page object
 */
export class TransactionDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Get page heading
   */
  getPageHeading() {
    return this.page.locator('[data-test="transaction-detail-header"]');
  }

  /**
   * Get comment input field
   */
  getCommentInput() {
    return this.page.getByRole('textbox', { name: 'Write a comment...' });
  }

  /**
   * Get transaction parties text (sender and receiver)
   */
  getTransactionParties() {
    return this.page.locator('text=/Solon_Robel60|Prohaska/i').first();
  }

  /**
   * Get transaction description/note
   */
  getTransactionNote() {
    return this.page.locator('text=/payment|note|description/i').first();
  }

  /**
   * Get main content area for checking amount
   */
  getMainContent() {
    return this.page.locator('main');
  }

  /**
   * Get Return to Transactions button
   */
  getReturnButton() {
    return this.page.locator('[data-test="transaction-return-to-transactions"]');
  }

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded() {
    await this.verifyURL(/transaction\//);
    await expect(this.getPageHeading()).toContainText('Transaction Detail');
  }

  /**
   * Verify transaction parties are visible
   */
  async verifyTransactionPartiesVisible() {
    await expect(this.getTransactionParties()).toBeVisible();
  }

  /**
   * Verify transaction note is visible
   */
  async verifyTransactionNoteVisible(): Promise<boolean> {
    return this.getTransactionNote().isVisible().catch(() => false);
  }

  /**
   * Verify amount is displayed
   */
  async verifyAmountDisplayed(): Promise<boolean> {
    const content = await this.getMainContent().textContent();
    return content ? /\$.*\d+/.test(content) : false;
  }

  /**
   * Verify comment section is visible
   */
  async verifyCommentSectionVisible() {
    await expect(this.getCommentInput()).toBeVisible();
  }

  /**
   * Add a comment
   */
  async addComment(commentText: string) {
    const input = this.getCommentInput();
    await input.fill(commentText);
    await input.press('Enter');
  }

  /**
   * Get comment input value
   */
  async getCommentInputValue(): Promise<string> {
    return this.getCommentInput().inputValue();
  }

  /**
   * Clear comment input
   */
  async clearCommentInput() {
    await this.getCommentInput().clear();
  }

  /**
   * Check if comment input is visible
   */
  async isCommentInputVisible(): Promise<boolean> {
    return this.getCommentInput().isVisible().catch(() => false);
  }

  /**
   * Click Return to Transactions button if visible
   */
  async clickReturnToTransactions() {
    const button = this.getReturnButton();
    if (await button.isVisible().catch(() => false)) {
      await button.click();
    }
  }
}
