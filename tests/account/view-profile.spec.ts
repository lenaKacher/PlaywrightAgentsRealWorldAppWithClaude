// spec: specs/RealWorldApp-comprehensive-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixture/loginPage';

test.describe('User Account Management', () => {
  test('User can view their account profile information', async ({ loginPage }) => {
    const page = loginPage;

    // 1. Look at the user profile section in the sidebar
    // User avatar should be displayed
    const userAvatar = page.locator('img[alt*="Solon_Robel60"]');
    await expect(userAvatar).toBeVisible();

    // Verify user's full name is shown
    const userName = page.locator('text=Lenore L S');
    await expect(userName).toBeVisible();

    // Verify user's handle is shown
    const userHandle = page.locator('text=@Solon_Robel60');
    await expect(userHandle).toBeVisible();

    // Verify account balance is displayed
    const accountBalance = page.locator('text=$671.31');
    await expect(accountBalance).toBeVisible();

    // Verify all profile information is visible in sidebar
    const sidebarProfileSection = page.locator('aside, [role="navigation"]');
    await expect(sidebarProfileSection).toBeVisible();

    // Verify the profile info container has multiple headings
    const profileHeadings = page.locator('heading[level="6"]');
    expect(await profileHeadings.count()).toBeGreaterThan(1);
  });
});
