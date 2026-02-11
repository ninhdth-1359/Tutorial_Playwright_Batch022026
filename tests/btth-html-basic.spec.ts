import { expect, test } from '@playwright/test';

test('user can register an account successfully when filling the registration form', async ({ page }) => {
  await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');

  // ===== ACTIONS =====
  await page.getByLabel('Username:').fill('Hai Ninh');
  await page.getByLabel('Email:').fill('dao.thi.hai.ninh@gmail.com');

  await page.getByRole('radio', { name: 'Female' }).check();

  await page.getByRole('checkbox', { name: 'Reading' }).check();
  await page.getByRole('checkbox', { name: 'Traveling' }).check();

  await page.getByLabel('Interests:').selectOption(['music', 'sports']);

  await page.getByLabel('Country:').selectOption({ label: 'Canada' });

  await page.locator('#dob').fill('1990-12-10');

  // ===== EXPECTS INPUT=====
  await expect(page.getByLabel('Username:')).toHaveValue('Hai Ninh');
  await expect(page.getByLabel('Email:')).toHaveValue('dao.thi.hai.ninh@gmail.com');

  await expect(
    page.getByRole('radio', { name: 'Female' })
  ).toBeChecked();

  await expect(
    page.getByRole('checkbox', { name: 'Reading' })
  ).toBeChecked();

  await expect(
    page.getByRole('checkbox', { name: 'Traveling' })
  ).toBeChecked();

  await expect(
    page.getByLabel('Interests:')
  ).toHaveValues(['music', 'sports']);

  await expect(
    page.getByLabel('Country:')
  ).toHaveValue('canada');

  await expect(
    page.locator('#dob')
  ).toHaveValue('1990-12-10');

  //Submit
  await page.getByRole('button', { name: 'Register' }).click();
  const userRow = page.locator('#userTable tbody tr', {
  hasText: 'Hai Ninh'
  });

  //Expect user
  await expect(userRow).toBeVisible();
  await expect(userRow).toContainText('dao.thi.hai.ninh@gmail.com');
  await expect(userRow).toContainText('female');
  await expect(userRow).toContainText('canada');
});
