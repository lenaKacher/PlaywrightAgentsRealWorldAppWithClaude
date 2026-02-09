/**
 * Test Configuration
 * Contains environment-specific settings and credentials for tests
 * Values can be overridden with environment variables
 */

export const testConfig = {
  // Base URL for the application
  baseUrl: process.env.PLAYWRIGHT_BASE_URL || 'http://frontend-ta-realworldapp.apps.os-prod.lab.proficom.de/',

  // Default test user credentials
  credentials: {
    username: process.env.TEST_USERNAME || 'Solon_Robel60',
    password: process.env.TEST_PASSWORD || 's3cret',
  },

  // Selectors for login form
  loginSelectors: {
    usernameField: '#username',
    passwordField: '#password',
    signInButton: '[data-test="signin-submit"]',
    signOutButton: '[data-test="sidenav-signout"]',
  },

  // Timeouts
  timeouts: {
    short: 3000,
    medium: 5000,
    long: 10000,
  },
};
