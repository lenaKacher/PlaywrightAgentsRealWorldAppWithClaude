import { Page, expect } from '@playwright/test';

/**
 * Base Page class that contains common functionality for all pages
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a URL
   */
  async goto(url: string) {
    await this.page.goto(url);
  }

  /**
   * Wait for URL to match pattern
   */
  async waitForURL(urlPattern: RegExp | string) {
    if (typeof urlPattern === 'string') {
      await this.page.waitForURL(urlPattern);
    } else {
      await this.page.waitForURL(urlPattern);
    }
  }

  /**
   * Get current URL
   */
  async getURL(): Promise<string> {
    return this.page.url();
  }

  /**
   * Verify current URL matches pattern
   */
  async verifyURL(urlPattern: RegExp | string) {
    if (typeof urlPattern === 'string') {
      await expect(this.page).toHaveURL(urlPattern);
    } else {
      await expect(this.page).toHaveURL(urlPattern);
    }
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
