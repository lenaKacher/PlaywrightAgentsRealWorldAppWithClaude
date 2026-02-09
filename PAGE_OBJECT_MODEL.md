# Page Object Model (POM) Architecture

This project uses the **Page Object Model** pattern to improve test maintainability, readability, and reusability.

## Overview

The Page Object Model abstracts UI interactions into dedicated page classes. This separates test logic from implementation details, making tests:

- **More Readable**: Tests focus on "what" instead of "how"
- **More Maintainable**: UI changes only require updates in one place
- **More Reusable**: Common interactions are shared across multiple tests
- **More Robust**: Reduces duplication and improves consistency

## Architecture

### Directory Structure

```
tests/
├── pages/                 # Page Object Models
│   ├── BasePage.ts       # Base class with common functionality
│   ├── SidebarPage.ts    # Navigation sidebar
│   ├── UserSettingsPage.ts
│   ├── UserProfilePage.ts
│   ├── TransactionNewPage.ts
│   └── HomePage.ts
├── fixture/
│   ├── loginPage.ts      # Original fixture (still used)
│   └── pageObjects.ts    # Enhanced fixture with POM
├── account/              # Account-related tests
├── edge-cases/           # Edge case tests
└── seed.spec.ts          # Seed data
```

### Page Classes

#### BasePage
Base class providing common functionality for all pages:
- `goto()` - Navigate to URL
- `verifyURL()` - Assert current URL
- `getURL()` - Get current page URL
- `waitForElement()` - Wait for element visibility
- `getTitle()` - Get page title

#### SidebarPage
Handles sidebar navigation:
- `clickHome()` - Click Home button
- `clickMyAccount()` - Click My Account button
- `clickBankAccounts()` - Click Bank Accounts button
- `clickNotifications()` - Click Notifications button
- `clickLogout()` - Click Logout button
- `getUserProfileInfo()` - Get user profile details
- `verifySidebarVisible()` - Verify sidebar is visible

#### UserSettingsPage
Handles user settings page interactions:
- **Getters**: `getFirstNameField()`, `getLastNameField()`, `getEmailField()`, etc.
- **Verification**: `verifyPageLoaded()`, `verifyAllFieldsVisible()`
- **Fill Methods**: `fillFirstName()`, `fillEmail()`, `clearEmail()`, etc.
- **Value Methods**: `getFieldValue()`, `verifyFieldValue()`
- **Button Methods**: `clickSave()`, `isSaveButtonDisabled()`
- **Error Methods**: `getErrorMessage()`, `verifyErrorMessageVisible()`

#### UserProfilePage
Handles user profile viewing:
- `getUserAvatar()` - Get avatar element
- `getUserName()` - Get name element
- `getUserHandle()` - Get handle element
- `getAccountBalance()` - Get balance element
- **Verification Methods**: `verifyAvatarVisible()`, `verifyUserNameVisible()`, etc.
- `verifyAllProfileInfoVisible()` - Verify complete profile

#### TransactionNewPage
Handles new transaction creation:
- **Getters**: `getAmountField()`, `getNoteField()`, `getPayButton()`, etc.
- **Interaction**: `selectContact()`, `selectReeceProhaska()`, `fillAmount()`, `fillNote()`
- **Verification**: `verifyPageLoaded()`, `verifyReceiverSelected()`
- **Actions**: `clickPay()`, `clickRequest()`

#### HomePage
Handles home/transaction list page:
- `getNewButton()` - Get New transaction button
- `getTransactionGrid()` - Get transaction list grid
- `getFirstTransactionItem()` - Get first transaction
- `getTab()` - Get tab by name
- **Actions**: `clickNew()`, `clickFirstTransaction()`, `clickTab()`
- **Verification**: `verifyPageLoaded()`, `verifyGridVisible()`, `verifyTabActive()`
- `getTransactionCount()` - Get number of transactions

## Using the Page Objects

### Setup Fixture

The `tests/fixture/pageObjects.ts` fixture provides page object instances:

```typescript
import { test, expect } from '../fixture/pageObjects';

test('example test', async ({ sidebar, userSettings }) => {
  // Page objects are automatically initialized with the logged-in page
  await sidebar.clickMyAccount();
  await userSettings.verifyPageLoaded();
});
```

### Available Fixtures

- `loginPage` - Raw Playwright page (still available for manual interactions)
- `sidebar` - SidebarPage instance
- `userSettings` - UserSettingsPage instance
- `userProfile` - UserProfilePage instance
- `transactionNew` - TransactionNewPage instance
- `homePage` - HomePage instance

## Example Test Comparison

### Before (Without POM)
```typescript
import { test, expect } from '../fixture/loginPage';

test('user can edit settings', async ({ loginPage }) => {
  const page = loginPage;
  
  // Direct UI interaction scattered throughout test
  await page.locator('[data-test="sidenav-user-settings"]').click();
  await expect(page).toHaveURL(/user\/settings/);
  
  const firstNameField = page.getByRole('textbox', { name: 'First Name' });
  await firstNameField.fill('John');
  await expect(firstNameField).toHaveValue('John');
  
  const saveButton = page.getByRole('button', { name: 'Save' });
  await saveButton.click();
});
```

### After (With POM)
```typescript
import { test } from '../fixture/pageObjects';

test('user can edit settings', async ({ sidebar, userSettings }) => {
  // Clean, readable test logic
  await sidebar.clickMyAccount();
  await userSettings.verifyPageLoaded();
  
  await userSettings.fillFirstName('John');
  await expect(userSettings.getFirstNameField()).toHaveValue('John');
  
  await userSettings.clickSave();
});
```

## Benefits Demonstrated

### Maintainability
If the "My Account" button selector changes:
- **Without POM**: Update it in every test file
- **With POM**: Update it once in `SidebarPage.clickMyAccount()`

### Readability
- Tests read like feature descriptions
- Clear intent and expected behavior
- Less clutter with implementation details

### Reusability
- `sidebar.clickMyAccount()` is used by multiple tests
- Common workflows can be created as helper methods
- DRY principle is applied to test code

## Adding New Page Objects

1. Create a new class extending `BasePage`
2. Define element getters (locators)
3. Create action methods (user interactions)
4. Add verification methods (assertions)
5. Export the class and add to `pageObjects.ts` fixture

Example:
```typescript
import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class NewPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getElement() {
    return this.page.locator('selector');
  }

  async clickElement() {
    await this.getElement().click();
  }

  async verifyElementVisible() {
    await expect(this.getElement()).toBeVisible();
  }
}
```

## Best Practices

1. **One responsibility per method**: Each method should do one thing
2. **Descriptive method names**: Name methods after user actions (clickSave, fillEmail)
3. **Return locators from getters**: Allow tests to use Playwright matchers
4. **Hide implementation details**: Tests shouldn't know about selectors
5. **Create reusable workflows**: Combine simple actions into complex workflows
6. **Use proper assertions**: Verification methods should include assertions where appropriate

## Migration Path

Existing tests can gradually migrate to use page objects:
- Start with new tests using POM
- Refactor existing tests as needed
- Both fixtures (`loginPage` and `pageObjects`) can coexist
- Use POM for new features, maintain legacy tests as-is if needed
