import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * New Transaction page object
 */
export class TransactionNewPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Get amount field
   */
  getAmountField() {
    return this.page.getByRole('textbox', { name: 'Amount' });
  }

  /**
   * Get note field
   */
  getNoteField() {
    return this.page.getByRole('textbox', { name: 'Add a note' });
  }

  /**
   * Get pay button
   */
  getPayButton() {
    return this.page.locator('[data-test="transaction-create-submit-payment"]');
  }

  /**
   * Get request button
   */
  getRequestButton() {
    return this.page.locator('[data-test="transaction-create-submit-request"]');
  }

  /**
   * Get contact list search input
   */
  getSearchInput() {
    return this.page.locator('[data-test="user-list-search-input"]');
  }

  /**
   * Search for contact
   */
  async searchContact(name: string) {
    const input = this.getSearchInput();
    await input.focus();
    await input.pressSequentially(name);
  }

  /**
   * Get receiver heading
   */
  getReceiverHeading() {
    return this.page.getByRole('heading', { level: 2 });
  }

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded() {
    await this.verifyURL(/transaction\/new/);
  }

  /**
   * Get contact by data-test attribute
   */
  getContactByDataTest(dataTestId: string) {
    return this.page.locator(`[data-test="${dataTestId}"]`);
  }

  /**
   * Select contact by data-test attribute
   */
  async selectContact(dataTestId: string) {
    await this.getContactByDataTest(dataTestId).click();
  }

  /**
   * Select contact "Reece Prohaska"
   */
  async selectReeceProhaska() {
    await this.selectContact('user-list-item-5beuD3-B59');
  }

  /**
   * Select contact "April Stracke"
   */
  async selectAprilStracke() {
    await this.selectContact('user-list-item-2vQ3zYpZAv');
  }

  /**
   * Fill amount field
   */
  async fillAmount(amount: string) {
    await this.getAmountField().fill(amount);
  }

  /**
   * Fill note field
   */
  async fillNote(note: string) {
    await this.getNoteField().fill(note);
  }

  /**
   * Clear amount field
   */
  async clearAmount() {
    await this.getAmountField().clear();
  }

  /**
   * Clear note field
   */
  async clearNote() {
    await this.getNoteField().clear();
  }

  /**
   * Get amount value
   */
  async getAmountValue(): Promise<string | null> {
    return this.getAmountField().getAttribute('value');
  }

  /**
   * Click pay button
   */
  async clickPay() {
    await this.getPayButton().click();
  }

  /**
   * Click request button
   */
  async clickRequest() {
    await this.getRequestButton().click();
  }

  /**
   * Verify pay button state
   */
  async verifyPayButtonDisabled(): Promise<boolean> {
    return this.getPayButton().isDisabled();
  }

  /**
   * Verify receiver is selected
   */
  async verifyReceiverSelected(receiverName: string) {
    await expect(this.getReceiverHeading()).toContainText(receiverName);
  }
}
