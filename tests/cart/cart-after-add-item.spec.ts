import { test, expect } from '@playwright/test';

test.describe('Cart - After add item', () => {
  test('User can see item in cart after adding item to cart', async ({ page }) => {
    //Go to saucedemo
    await page.goto('https://www.saucedemo.com/');

    //Login
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Add item to cart
    const cartBadge = page.locator('.shopping_cart_badge');
    await page.locator('.inventory_item')
              .filter({ has: page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' }) })
              .getByRole('button', { name: 'Add to cart' }).click();

    await expect(cartBadge).toHaveText('1');
    await expect(page.locator('.inventory_item')
              .filter({ has: page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' }) })
              .getByRole('button', { name: 'Remove' })
            ).toBeVisible();

  // Add another item to cart
    await page.locator('.inventory_item')
          .filter({ has: page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bike Light' }) })
          .getByRole('button', { name: 'Add to cart' }).click();

    await expect(cartBadge).toHaveText('2');
    await expect(page.locator('.inventory_item')
          .filter({ has: page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bike Light' }) })
          .getByRole('button', { name: 'Remove' })
        ).toBeVisible();
  });
});
