# Cypress Real World App - Comprehensive Test Plan

## Application Overview

Cypress Real World App is a financial transaction application that allows users to send and request payments, manage their bank accounts, view transaction history, and communicate through comments. The app includes features for user account management, transaction filtering, and notifications. This test plan covers all major functionality including happy path scenarios, edge cases, error handling, and validation.

## Test Scenarios

### 1. Transaction Management - Create & Send Payments

**Seed:** `tests/seed.spec.ts`

#### 1.1. User can create and send a payment transaction successfully

**File:** `tests/transactions/create-payment.spec.ts`

**Steps:**
  1. Click the 'New' button in the top navigation
    - expect: Navigation to transaction creation page
    - expect: Step 1: Select Contact is shown
  2. Select 'Reece Prohaska' from the contact list
    - expect: Contact is selected and marked with checkmark
    - expect: Step 2: Payment details form is displayed
  3. Enter amount '75.50' in the Amount field
    - expect: Amount field displays '$75.50'
  4. Enter 'Dinner payment' in the note field
    - expect: Note is displayed in the text field
  5. Click the 'Pay' button
    - expect: Step 3: Complete screen is shown
    - expect: Transaction is successfully created
    - expect: User is redirected to transaction details or home page
    - expect: Payment appears in transaction list with '-$75.50' amount

#### 1.2. User can create and send a payment request transaction

**File:** `tests/transactions/create-request.spec.ts`

**Steps:**
  1. Click the 'New' button in the top navigation
    - expect: Navigation to transaction creation page
  2. Select 'April Stracke' from the contact list
    - expect: Contact is selected
  3. Enter amount '125.00' in the Amount field
    - expect: Amount field displays '$125.00'
  4. Enter 'Loan repayment' in the note field
    - expect: Note is displayed
  5. Click the 'Request' button instead of 'Pay'
    - expect: Request transaction is created
    - expect: Transaction appears in list with '+$125.00' amount
    - expect: Transaction type shows as 'requested' in description

#### 1.3. User can search for and select contact from contact list

**File:** `tests/transactions/search-contact.spec.ts`

**Steps:**
  1. Click the 'New' button
    - expect: Contact selection page is displayed
    - expect: Search box is visible
  2. Type 'Neal' in the search box
    - expect: Contact list is filtered
    - expect: Only contacts with 'Neal' in name appear (Neal Macejkovic)
  3. Click on 'Klaus Müller' from the list
    - expect: Selected contact is displayed with full details

#### 1.4. User cannot send payment with empty required fields

**File:** `tests/transactions/validation-empty-fields.spec.ts`

**Steps:**
  1. Click 'New' and select a contact
    - expect: Payment form is displayed
  2. Leave Amount field empty and click 'Pay' button
    - expect: 'Pay' button remains disabled or error message is shown
  3. Fill in amount '50' but leave note empty and click 'Pay'
    - expect: Payment is either blocked or note field becomes required

#### 1.5. User can clear and re-enter transaction data

**File:** `tests/transactions/edit-before-submit.spec.ts`

**Steps:**
  1. Click 'New' and select a contact
    - expect: Payment form is displayed
  2. Enter amount '100' in Amount field
    - expect: Amount is displayed
  3. Clear the Amount field and enter '75' instead
    - expect: Amount field shows '$75'
  4. Enter a note and click 'Pay'
    - expect: Transaction is created with the updated amount of $75

### 2. Transaction Viewing & Details

**Seed:** `tests/seed.spec.ts`

#### 2.1. User can view transaction details page

**File:** `tests/transactions/view-details.spec.ts`

**Steps:**
  1. On the home page, click on any transaction from the list
    - expect: Transaction detail page is displayed
    - expect: Transaction detail heading is shown
    - expect: Transaction information includes: sender name, receiver name, amount, and description
  2. Verify transaction details are correct (amount, parties, note)
    - expect: All transaction information is accurate and clearly displayed

#### 2.2. User can add and view comments on transactions

**File:** `tests/transactions/add-comments.spec.ts`

**Steps:**
  1. Navigate to a transaction detail page
    - expect: Transaction detail page is loaded
    - expect: Comment section is visible showing '0' comments
  2. Type 'This looks correct' in the comment field
    - expect: Text is entered in the comment field
  3. Submit the comment (press Enter or click a submit button)
    - expect: Comment is added to the transaction
    - expect: Comment count increases to '1'
    - expect: Comment text appears below the transaction details

#### 2.3. User can navigate back from transaction detail to transaction list

**File:** `tests/transactions/navigate-back.spec.ts`

**Steps:**
  1. Click on any transaction to view details
    - expect: Transaction detail page is shown
  2. Click the 'Home' button in the sidebar or the back arrow if available
    - expect: User is returned to the home page
    - expect: Transaction list is displayed
    - expect: Browser shows home page URL

### 3. Transaction Filtering & Tabs

**Seed:** `tests/seed.spec.ts`

#### 3.1. User can switch between transaction view tabs: Everyone, Friends, Mine

**File:** `tests/transactions/tab-switching.spec.ts`

**Steps:**
  1. On the home page, verify 'Everyone' tab is selected by default
    - expect: 'Everyone' tab is highlighted
    - expect: Transaction list shows all transactions
    - expect: Label shows 'Public'
  2. Click on 'Friends' tab
    - expect: 'Friends' tab becomes active
    - expect: Transaction list updates
    - expect: Label shows 'Contacts'
  3. Click on 'Mine' tab
    - expect: 'Mine' tab becomes active
    - expect: Transaction list shows only personal transactions
    - expect: Label shows 'Personal'
  4. Return to 'Everyone' tab
    - expect: 'Everyone' tab is active again
    - expect: All transactions are displayed

#### 3.2. User can filter transactions by date range

**File:** `tests/transactions/filter-by-date.spec.ts`

**Steps:**
  1. Click on 'Date: ALL' filter button
    - expect: Calendar date picker is displayed
    - expect: Multiple month calendars are visible
    - expect: 'Today' button is shown
  2. Click on a date in the past (e.g., January 15)
    - expect: Calendar shows January 15 is selected
  3. Close the calendar picker or confirm selection
    - expect: Date filter is applied
    - expect: Filter button text updates
    - expect: Transaction list is filtered to show only transactions from selected date

#### 3.3. User can filter transactions by amount range

**File:** `tests/transactions/filter-by-amount.spec.ts`

**Steps:**
  1. Click on 'Amount: $0 - $1,000' filter button
    - expect: Amount filter dropdown or menu is displayed
  2. Select a different amount range (e.g., '$1,000 - $10,000' if available)
    - expect: Amount filter is updated
    - expect: Filter button text changes
    - expect: Transaction list is filtered accordingly
  3. Return to '$0 - $1,000' range
    - expect: Default range is restored
    - expect: All transactions in that range are displayed

#### 3.4. Multiple filters can be applied together

**File:** `tests/transactions/multiple-filters.spec.ts`

**Steps:**
  1. Apply date filter to a specific date
    - expect: Date filter is active
  2. Apply amount filter to a specific range
    - expect: Amount filter is active
  3. Switch to 'Friends' tab
    - expect: Both filters and tab selection are active
    - expect: Transaction list shows filtered results from Friends only
    - expect: Filters are preserved when switching tabs

### 4. User Account Management

**Seed:** `tests/seed.spec.ts`

#### 4.1. User can view their account profile information

**File:** `tests/account/view-profile.spec.ts`

**Steps:**
  1. Look at the user profile section in the sidebar
    - expect: User avatar is displayed
    - expect: User's full name is shown (Lenore L S)
    - expect: User's handle is shown (@Solon_Robel60)
    - expect: Account balance is displayed ($671.31)

#### 4.2. User can edit their account settings

**File:** `tests/account/edit-settings.spec.ts`

**Steps:**
  1. Click 'My Account' button in the sidebar
    - expect: User Settings page is displayed
    - expect: Heading shows 'User Settings'
    - expect: Profile image upload area is visible
  2. Verify form fields are visible and editable: First Name, Last Name, Email, Phone Number
    - expect: First Name field shows 'Lenore L'
    - expect: Last Name field shows 'Solon_Robel60'
    - expect: Email field shows 'test.user@example.com'
    - expect: Phone Number field shows '123-456-7890'
  3. Change First Name to 'John' and Last Name to 'Doe'
    - expect: Fields are updated with new values
  4. Click 'Save' button
    - expect: Changes are saved
    - expect: Success message is displayed or profile updates
    - expect: User is returned to settings page or profile

#### 4.3. User cannot save settings with invalid data

**File:** `tests/account/validation-settings.spec.ts`

**Steps:**
  1. Navigate to User Settings page
    - expect: Settings form is displayed
  2. Clear the First Name field completely
    - expect: First Name is empty
  3. Click 'Save' button
    - expect: Save fails with validation error or First Name field becomes required
    - expect: 'Save' button may be disabled
  4. Enter an invalid email format (e.g., 'notanemail')
    - expect: Email validation error appears or prevents submission

### 5. Bank Accounts Management

**Seed:** `tests/seed.spec.ts`

#### 5.1. User can view list of bank accounts

**File:** `tests/bank-accounts/view-accounts.spec.ts`

**Steps:**
  1. Click 'Bank Accounts' button in the sidebar
    - expect: Bank Accounts page is displayed
    - expect: Heading shows 'Bank Accounts'
    - expect: List of existing bank accounts is shown
    - expect: All accounts show as '(Deleted)'
  2. Scroll through the list of bank accounts
    - expect: Multiple bank accounts are visible (Murazik LLC Bank, ING Bank, The Bank Name, Test Bank, etc.)
    - expect: All accounts are listed

#### 5.2. User can create a new bank account

**File:** `tests/bank-accounts/create-account.spec.ts`

**Steps:**
  1. Click 'Bank Accounts' in sidebar
    - expect: Bank Accounts list page is displayed
  2. Click 'Create' button
    - expect: Create Bank Account page is displayed
    - expect: Form fields are visible: Bank Name, Routing Number, Account Number
    - expect: 'Save' button is present
  3. Enter 'My Test Bank' in Bank Name field
    - expect: Bank Name is entered
  4. Enter '021000021' in Routing Number field
    - expect: Routing Number is entered
  5. Enter '0123456789' in Account Number field
    - expect: Account Number is entered
  6. Click 'Save' button
    - expect: Bank account is created successfully
    - expect: User is returned to Bank Accounts list
    - expect: New account appears in the list

#### 5.3. User cannot create bank account with empty required fields

**File:** `tests/bank-accounts/validation-create.spec.ts`

**Steps:**
  1. Click 'Bank Accounts' and then 'Create'
    - expect: Create Bank Account form is displayed
  2. Leave all fields empty and click 'Save'
    - expect: Form submission is prevented
    - expect: Validation error messages appear for required fields
  3. Fill in Bank Name but leave Routing Number and Account Number empty
    - expect: 'Save' button may be disabled or validation errors shown

### 6. Notifications

**Seed:** `tests/seed.spec.ts`

#### 6.1. User can view notifications

**File:** `tests/notifications/view-notifications.spec.ts`

**Steps:**
  1. Click 'Notifications' button in the sidebar
    - expect: Notifications page is displayed
    - expect: Heading shows 'Notifications'
    - expect: List of notifications is visible
  2. Verify notification list contains various notification types
    - expect: Notifications include: 'received payment', 'requested payment', 'commented on transaction'
    - expect: Each notification shows relevant user information

#### 6.2. User can dismiss individual notifications

**File:** `tests/notifications/dismiss-notification.spec.ts`

**Steps:**
  1. Navigate to Notifications page
    - expect: Notifications are displayed
  2. Click 'Dismiss' button on the first notification
    - expect: Notification is removed from the list
    - expect: Remaining notifications are displayed
  3. Click 'Dismiss' on another notification
    - expect: Second notification is also removed

#### 6.3. Notification count badge updates correctly

**File:** `tests/notifications/badge-count.spec.ts`

**Steps:**
  1. On home page, observe the notification badge button showing '6' at top right
    - expect: Badge displays number of unread/active notifications
  2. Navigate to Notifications and dismiss one notification
    - expect: Notification is removed
  3. Navigate back to home page
    - expect: Notification badge is updated and shows count decreased by 1 (or becomes '5')
    - expect: Count reflects dismissed notifications

### 7. Navigation & Layout

**Seed:** `tests/seed.spec.ts`

#### 7.1. User can navigate using sidebar menu

**File:** `tests/navigation/sidebar-menu.spec.ts`

**Steps:**
  1. From any page, click 'Home' in sidebar
    - expect: User is navigated to home page
    - expect: URL changes to home
    - expect: Home button is highlighted/active
  2. Click 'My Account'
    - expect: User Settings page is displayed
    - expect: My Account button is highlighted
  3. Click 'Bank Accounts'
    - expect: Bank Accounts page is displayed
  4. Click 'Home' again
    - expect: Navigation returns to home page

#### 7.2. User can toggle drawer/navigation menu on mobile (if applicable)

**File:** `tests/navigation/drawer-menu.spec.ts`

**Steps:**
  1. Click 'open drawer' button (hamburger menu) at top left
    - expect: Drawer/notification panel opens if not already visible
  2. Verify drawer contains all menu items
    - expect: Home, My Account, Bank Accounts, Notifications, and Logout options are visible in drawer

#### 7.3. User can navigate using top navigation buttons

**File:** `tests/navigation/top-nav.spec.ts`

**Steps:**
  1. Click the logo/home icon in top navigation
    - expect: User is returned to home page
    - expect: Logo acts as home link
  2. Click 'New' button
    - expect: Transaction creation page is displayed
  3. Click notification bell button (showing '6')
    - expect: Notification count is displayed
    - expect: May open notifications or show dropdown

#### 7.4. User can logout from the application

**File:** `tests/navigation/logout.spec.ts`

**Steps:**
  1. Click 'Logout' button in the sidebar
    - expect: User is logged out
    - expect: User is redirected to login page
    - expect: Session is terminated

### 8. Edge Cases & Error Handling

**Seed:** `tests/seed.spec.ts`

#### 8.1. User cannot send payment to themselves

**File:** `tests/edge-cases/payment-to-self.spec.ts`

**Steps:**
  1. Click 'New' button to create transaction
    - expect: Contact selection page shown
  2. Try to select the current user from contact list
    - expect: Current user may not appear in list, or selection is prevented/disabled

#### 8.2. User cannot enter negative amount

**File:** `tests/edge-cases/negative-amount.spec.ts`

**Steps:**
  1. Click 'New' and select a contact
    - expect: Payment form is shown
  2. Try to enter negative amount (e.g., '-50')
    - expect: Negative value is prevented, ignored, or error shown
    - expect: Amount field only accepts positive values

#### 8.3. User cannot enter zero amount

**File:** `tests/edge-cases/zero-amount.spec.ts`

**Steps:**
  1. Click 'New' and select a contact
    - expect: Payment form is shown
  2. Try to enter '0' in Amount field
    - expect: Zero amount is not accepted
    - expect: Error message or validation prevents submission

#### 8.4. User can enter very large amount

**File:** `tests/edge-cases/large-amount.spec.ts`

**Steps:**
  1. Click 'New' and select a contact
    - expect: Payment form is shown
  2. Enter very large amount (e.g., '999999.99')
    - expect: Large amount is accepted
    - expect: Amount displays with proper formatting
  3. Complete payment
    - expect: Payment is created with the large amount
    - expect: Transaction list shows amount correctly

#### 8.5. User can enter decimal amounts

**File:** `tests/edge-cases/decimal-amount.spec.ts`

**Steps:**
  1. Click 'New' and select a contact
    - expect: Payment form is shown
  2. Enter amount with cents (e.g., '50.75')
    - expect: Decimal amount is accepted
    - expect: Amount displays as '$50.75'
  3. Complete payment
    - expect: Transaction is created with decimal amount
    - expect: Amount shows correctly in transaction list

#### 8.6. Application handles network errors gracefully

**File:** `tests/edge-cases/network-error.spec.ts`

**Steps:**
  1. Perform a transaction operation (create, save, view)
    - expect: If network fails, error message is displayed to user
  2. Verify error message is clear and user can retry
    - expect: User is informed of the error
    - expect: Retry option is available

### 9. Data Persistence & Consistency

**Seed:** `tests/seed.spec.ts`

#### 9.1. Transaction data persists after page refresh

**File:** `tests/data-persistence/refresh-persistence.spec.ts`

**Steps:**
  1. Create a new transaction (payment or request)
    - expect: Transaction is created successfully
    - expect: Transaction appears in the list
  2. Refresh the page using browser refresh button
    - expect: Page reloads
    - expect: Transaction is still visible in the list
    - expect: Data is persistent

#### 9.2. Account balance updates correctly after transactions

**File:** `tests/data-persistence/balance-update.spec.ts`

**Steps:**
  1. Note the current account balance in sidebar
    - expect: Current balance is displayed (e.g., $671.31)
  2. Create a payment of $50
    - expect: Payment is created
  3. Verify account balance has decreased by $50
    - expect: New balance reflects the deduction
    - expect: Balance updates correctly

#### 9.3. Edited user settings persist

**File:** `tests/data-persistence/settings-persistence.spec.ts`

**Steps:**
  1. Navigate to My Account
    - expect: User Settings page is displayed
  2. Change First Name and click Save
    - expect: Changes are saved
  3. Navigate away and return to My Account
    - expect: Updated First Name is still displayed
    - expect: Changes persisted
