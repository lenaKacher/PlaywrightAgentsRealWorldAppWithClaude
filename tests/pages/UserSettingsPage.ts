import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * User Settings page object
 */
export class UserSettingsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Get first name field
   */
  getFirstNameField() {
    return this.page.getByRole('textbox', { name: 'First Name' });
  }

  /**
   * Get last name field
   */
  getLastNameField() {
    return this.page.getByRole('textbox', { name: 'Last Name' });
  }

  /**
   * Get email field
   */
  getEmailField() {
    return this.page.getByRole('textbox', { name: 'Email' });
  }

  /**
   * Get phone number field
   */
  getPhoneNumberField() {
    return this.page.getByRole('textbox', { name: 'Phone Number' });
  }

  /**
   * Get save button
   */
  getSaveButton() {
    return this.page.getByRole('button', { name: 'Save' });
  }

  /**
   * Get page heading
   */
  getPageHeading() {
    return this.page.getByRole('heading', { name: 'User Settings', exact: true });
  }

  /**
   * Get alert/error message
   */
  getErrorMessage() {
    return this.page.locator('[role="alert"]');
  }

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded() {
    await this.verifyURL(/settings/);
    await expect(this.getPageHeading()).toBeVisible();
  }

  /**
   * Verify all form fields are visible
   */
  async verifyAllFieldsVisible() {
    await expect(this.getFirstNameField()).toBeVisible();
    await expect(this.getLastNameField()).toBeVisible();
    await expect(this.getEmailField()).toBeVisible();
    await expect(this.getPhoneNumberField()).toBeVisible();
  }

  /**
   * Fill first name
   */
  async fillFirstName(name: string) {
    await this.getFirstNameField().fill(name);
  }

  /**
   * Fill last name
   */
  async fillLastName(name: string) {
    await this.getLastNameField().fill(name);
  }

  /**
   * Fill email
   */
  async fillEmail(email: string) {
    await this.getEmailField().fill(email);
  }

  /**
   * Fill phone number
   */
  async fillPhoneNumber(phone: string) {
    await this.getPhoneNumberField().fill(phone);
  }

  /**
   * Clear first name field
   */
  async clearFirstName() {
    await this.getFirstNameField().clear();
  }

  /**
   * Clear email field
   */
  async clearEmail() {
    await this.getEmailField().clear();
  }

  /**
   * Click save button
   */
  async clickSave() {
    await this.getSaveButton().click();
  }

  /**
   * Check if save button is disabled
   */
  async isSaveButtonDisabled(): Promise<boolean> {
    return this.getSaveButton().isDisabled();
  }

  /**
   * Verify error message is visible
   */
  async verifyErrorMessageVisible(): Promise<boolean> {
    return this.getErrorMessage().isVisible().catch(() => false);
  }

  /**
   * Get field value by label
   */
  async getFieldValue(fieldLabel: string): Promise<string> {
    const field = this.page.getByRole('textbox', { name: fieldLabel });
    return field.inputValue();
  }

  /**
   * Verify field has expected value
   */
  async verifyFieldValue(fieldLabel: string, expectedValue: string) {
    const field = this.page.getByRole('textbox', { name: fieldLabel });
    await expect(field).toHaveValue(expectedValue);
  }
}
