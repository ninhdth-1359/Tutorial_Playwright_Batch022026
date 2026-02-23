import { expect, test } from '@playwright/test';

test('Register and login successfully', async ({ page }) => {
  // Navigate to the registration page
  await page.goto('https://buggy.justtestit.org/register');

  //Verify UI
  await expect(
    page.getByRole('heading', { name: 'Register with Buggy Cars Rating' }),
  ).toBeVisible();
  await expect(page.getByLabel('Login')).toBeVisible();
  await expect(page.getByLabel('Login')).toBeEditable();
  await expect(page.getByLabel('First Name')).toBeVisible();
  await expect(page.getByLabel('First Name')).toBeEditable();
  await expect(page.getByLabel('Last Name')).toBeVisible();
  await expect(page.getByLabel('Last Name')).toBeEditable();
  await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Password', { exact: true })).toBeEditable();
  await expect(page.getByLabel('Confirm Password')).toBeVisible();
  await expect(page.getByLabel('Confirm Password')).toBeEditable();
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeEnabled();

  // Fill in the registration form
  const name = `Ninh${Date.now()}`;
  const password = 'Password123!';

  await page.getByLabel('Login').fill(name);
  await page.getByLabel('First Name').fill('Hai');
  await page.getByLabel('Last Name').fill('Ninh');
  await page.getByLabel('Password', { exact: true }).fill(password);
  await page.getByLabel('Confirm Password').fill(password);
  await expect(page.getByRole('button', { name: 'Register' })).toBeEnabled();

  // Submit the registration form
  await page.getByRole('button', { name: 'Register' }).click();

  // Verify successful registration
  await expect(page.getByText('Registration is successful')).toBeVisible();

  //Login with the registered account
  const header = page.getByRole('navigation');

  await header.getByPlaceholder('Login').fill(name);
  await header.locator('input[type="password"]').fill(password);
  await header.getByRole('button', { name: 'Login' }).click();

  // Verify successful login
  await expect(header.getByText('Hi, Hai')).toBeVisible();
  await expect(header.getByRole('link', { name: 'Profile' })).toBeVisible();
  await expect(header.getByRole('link', { name: 'Profile' })).toBeEnabled();
  await expect(header.getByRole('link', { name: 'Logout' })).toBeVisible();
  await expect(header.getByRole('link', { name: 'Logout' })).toBeEnabled();
});
