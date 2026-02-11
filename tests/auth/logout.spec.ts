import { test, expect } from '@playwright/test';

test('user can redirect to homepage after logging out successfully', async ({ page }) => {
  //Login
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  //Logout
  await page.locator('#react-burger-menu-btn').click();
  await page.getByRole('link', { name: 'Logout' }).click();

  //Expect
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
