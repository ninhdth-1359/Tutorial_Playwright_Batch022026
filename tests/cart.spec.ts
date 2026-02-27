import { expect } from '@playwright/test';
import { CartPage } from '../pages/cart-pages';
import { test } from './fixtures/login.fixture';

test.describe('Cart Functionality', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    // Đảm bảo rằng trước mỗi test, chúng ta đã ở trang inventory
    await inventoryPage.goto();
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
  });

  test('should add item to cart and verify it', async ({ inventoryPage }) => {
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
  });

  test('should redirect to cart and verify item details', async ({ inventoryPage }) => {
    // redirect to cart page
    await inventoryPage.shoppingCartLink.click();
    const cartPage = new CartPage(inventoryPage.page);
    await expect(cartPage.cartItems.first().locator('.inventory_item_name')).toHaveText(
      'Sauce Labs Backpack',
    );
  });
});
