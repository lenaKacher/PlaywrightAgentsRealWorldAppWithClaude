import { test as base, expect } from '@playwright/test';
import { Page } from '@playwright/test';
import { testConfig } from '../config/testConfig';
import { SidebarPage } from '../pages/SidebarPage';
import { UserSettingsPage } from '../pages/UserSettingsPage';
import { UserProfilePage } from '../pages/UserProfilePage';
import { TransactionNewPage } from '../pages/TransactionNewPage';
import { HomePage } from '../pages/HomePage';
import { BankAccountsPage } from '../pages/BankAccountsPage';
import { CreateBankAccountPage } from '../pages/CreateBankAccountPage';
import { TransactionDetailPage } from '../pages/TransactionDetailPage';
import { NotificationsPage } from '../pages/NotificationsPage';

type TestFixtures = {
  loginPage: Page;
  sidebar: SidebarPage;
  userSettings: UserSettingsPage;
  userProfile: UserProfilePage;
  transactionNew: TransactionNewPage;
  homePage: HomePage;
  bankAccounts: BankAccountsPage;
  createBankAccount: CreateBankAccountPage;
  transactionDetail: TransactionDetailPage;
  notifications: NotificationsPage;
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
  bankAccounts: async ({ loginPage }, use) => {
    const bankAccounts = new BankAccountsPage(loginPage);
    await use(bankAccounts);
  },
  createBankAccount: async ({ loginPage }, use) => {
    const createBankAccount = new CreateBankAccountPage(loginPage);
    await use(createBankAccount);
  },
  transactionDetail: async ({ loginPage }, use) => {
    const transactionDetail = new TransactionDetailPage(loginPage);
    await use(transactionDetail);
  },
  notifications: async ({ loginPage }, use) => {
    const notifications = new NotificationsPage(loginPage);
    await use(notifications);
  },
});

export { expect };
