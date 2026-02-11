import {expect, test} from '@playwright/test';

test('user can redirect to JavaScript page when pressing Enter in search box', async ({page} ) => {
  await page.goto('https://www.w3schools.com/');

  const searchInput = page.locator('#tnb-google-search-input');
  await searchInput.fill('Javascript');
  await searchInput.press('Enter');

  await expect(page.getByRole('heading', {name: 'JavaScript Tutorial'})).toBeVisible();
});
