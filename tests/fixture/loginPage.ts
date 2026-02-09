import { test as base, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { testConfig } from '../config/testConfig';

type TestFixtures = {
  loginPage: Page;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await page.goto(testConfig.baseUrl);
    await page.fill(testConfig.loginSelectors.usernameField, testConfig.credentials.username);
    await page.fill(testConfig.loginSelectors.passwordField, testConfig.credentials.password);
    await page.click(testConfig.loginSelectors.signInButton);
    await page.waitForSelector(testConfig.loginSelectors.signOutButton);
    await use(page);
  },
});

export { expect };