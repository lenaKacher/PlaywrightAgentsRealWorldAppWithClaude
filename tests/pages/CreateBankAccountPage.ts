import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Create Bank Account page object
 */
export class CreateBankAccountPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Get Bank Name field
   */
  getBankNameField() {
    return this.page.getByRole('textbox', { name: /Bank.*Name|bankName/ });
  }

  /**
   * Get Routing Number field
   */
  getRoutingNumberField() {
    return this.page.getByRole('textbox', { name: /Routing.*Number|routingNumber/ });
  }

  /**
   * Get Account Number field
   */
  getAccountNumberField() {
    return this.page.getByRole('textbox', { name: /Account.*Number|accountNumber/ });
  }

  /**
   * Get Save button
   */
  getSaveButton() {
    return this.page.locator('[data-test*="bank-account-submit"], button:has-text("Save")').first();
  }

  /**
   * Get page heading
   */
  getPageHeading() {
    return this.page.getByRole('heading', { name: /Bank/ });
  }

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded() {
    await this.verifyURL(/bankaccounts\/new/);
    await expect(this.getPageHeading()).toBeVisible();
  }

  /**
   * Verify all form fields are visible
   */
  async verifyAllFieldsVisible() {
    await expect(this.getBankNameField()).toBeVisible();
    await expect(this.getRoutingNumberField()).toBeVisible();
    await expect(this.getAccountNumberField()).toBeVisible();
  }

  /**
   * Fill bank name
   */
  async fillBankName(name: string) {
    await this.getBankNameField().fill(name);
  }

  /**
   * Fill routing number
   */
  async fillRoutingNumber(number: string) {
    await this.getRoutingNumberField().fill(number);
  }

  /**
   * Fill account number
   */
  async fillAccountNumber(number: string) {
    await this.getAccountNumberField().fill(number);
  }

  /**
   * Click Save button
   */
  async clickSave() {
    await this.getSaveButton().click();
  }

  /**
   * Check if Save button is disabled
   */
  async isSaveDisabled(): Promise<boolean> {
    return this.getSaveButton().isDisabled();
  }

  /**
   * Get error message
   */
  getErrorMessage() {
    return this.page.locator('[role="alert"]');
  }

  /**
   * Verify error message is visible
   */
  async verifyErrorMessageVisible(): Promise<boolean> {
    return this.getErrorMessage().isVisible().catch(() => false);
  }

  /**
   * Create bank account with provided details
   */
  async createBankAccount(bankName: string, routingNumber: string, accountNumber: string) {
    await this.fillBankName(bankName);
    await this.fillRoutingNumber(routingNumber);
    await this.fillAccountNumber(accountNumber);
    await this.clickSave();
  }
}
