import { expect, test } from '@playwright/test';

test.describe('Authentication Tests', () => {
  test.describe('Positive scenarios', () => {
    //Login with valid credentials before each test in this block
    test.beforeEach(async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
      await page.getByPlaceholder('Username').fill('standard_user');
      await page.getByPlaceholder('Password').fill('secret_sauce');
      await page.getByRole('button', { name: 'Login' }).click();
    });

    //test 1: Verify that the user can successfully log in with valid credentials
    test('should redirect to the inventory page after successful login', async ({
      page,
    }) => {
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await expect(page).toHaveTitle('Swag Labs');
    });

    //test 2: Verify that the user can log out successfully
    test('should log out successfully and redirect to the login page', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'Open Menu' }).click();
      await page.getByRole('link', { name: 'Logout' }).click();
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
  });

  test.describe('Negative scenarios', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
    });

    test('should display an error message when logging in with invalid password', async ({
      page,
    }) => {
      await page.getByPlaceholder('Username').fill('standard_user');
      await page.getByPlaceholder('Password').fill('invalid_password');
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(
        page.getByText(
          'Epic sadface: Username and password do not match any user in this service',
        ),
      ).toBeVisible();
    });

    test('should display an error message when logging in with locked_out_user', async ({
      page,
    }) => {
      await page.getByPlaceholder('Username').fill('locked_out_user');
      await page.getByPlaceholder('Password').fill('secret_sauce');
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(
        page.getByText('Epic sadface: Sorry, this user has been locked out.'),
      ).toBeVisible();
    });
  });

  test.afterEach(async ({ page }, testInfo) => {
    const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
  });
});
