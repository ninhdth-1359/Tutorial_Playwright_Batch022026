import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/cart-page';
import { InventoryPage } from '../pages/inventory-page';
import { LoginPage } from '../pages/login-page';

test.describe('Check inventories', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test.afterEach(async () => {
    await inventoryPage.logout();
  });

  test('should display exactly 6 inventory items', async () => {
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test('should display name of first inventory item exactly as "Sauce Labs Backpack"', async () => {
    await expect(inventoryPage.inventoryItems.first().locator('.inventory_item_name')).toHaveText(
      'Sauce Labs Backpack',
    );
  });
});

test.describe('Add to cart and remove from cart', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
  });

  test.afterEach(async () => {
    await inventoryPage.goto();
    await inventoryPage.removeItemFromCartByName('Sauce Labs Backpack');
    await inventoryPage.logout();
  });

  test('should display 1 item in the cart after adding "Sauce Labs Backpack" to the cart', async () => {
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
  });

  test('should display items Sauce Labs Backpack in the cart after adding it to the cart', async ({
    page,
  }) => {
    await inventoryPage.shoppingCartLink.click();
    const cartPage = new CartPage(page);
    await expect(cartPage.cartItems.first().locator('.inventory_item_name')).toHaveText(
      'Sauce Labs Backpack',
    );
  });
});
