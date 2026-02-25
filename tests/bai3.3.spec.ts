import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/cart-page';
import { InventoryPage } from '../pages/inventory-page';
import { LoginPage } from '../pages/login-page';

test.describe('Check inventories', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeAll(async () => {
    console.log('Bat dau chay nhom tests');
  });

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.shoppingCartLink.click();
  });

  test.afterEach(async ({}) => {
    await inventoryPage.goto();
    await inventoryPage.logout();
  });

  test.afterAll(async () => {
    console.log('Ket thuc nhom tests');
  });

  test('should redirect to the cart page after clicking on the shopping cart badge', async ({
    page,
  }) => {
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    await expect(page).toHaveTitle('Swag Labs');
  });

  test('should redirect to inventory page after clicking on continue shopping button', async ({
    page,
  }) => {
    await cartPage.continueShoppingButton.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('should redirect to checkout page after clicking on checkout button', async ({ page }) => {
    await cartPage.checkoutButton.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  });
});
