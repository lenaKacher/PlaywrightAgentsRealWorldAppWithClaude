import { test as base, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { testConfig } from '../config/testConfig';
import { SidebarPage } from '../pages/SidebarPage';
import { UserSettingsPage } from '../pages/UserSettingsPage';
import { UserProfilePage } from '../pages/UserProfilePage';
import { TransactionNewPage } from '../pages/TransactionNewPage';
import { HomePage } from '../pages/HomePage';

type TestFixtures = {
  loginPage: Page;
  sidebar: SidebarPage;
  userSettings: UserSettingsPage;
  userProfile: UserProfilePage;
  transactionNew: TransactionNewPage;
  homePage: HomePage;
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
  sidebar: async ({ loginPage }, use) => {
    const sidebar = new SidebarPage(loginPage);
    await use(sidebar);
  },
  userSettings: async ({ loginPage }, use) => {
    const userSettings = new UserSettingsPage(loginPage);
    await use(userSettings);
  },
  userProfile: async ({ loginPage }, use) => {
    const userProfile = new UserProfilePage(loginPage);
    await use(userProfile);
  },
  transactionNew: async ({ loginPage }, use) => {
    const transactionNew = new TransactionNewPage(loginPage);
    await use(transactionNew);
  },
  homePage: async ({ loginPage }, use) => {
    const homePage = new HomePage(loginPage);
    await use(homePage);
  },
});

export { expect };
