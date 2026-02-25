import { expect, test } from '@playwright/test';
import { InventoryPage } from '../pages/inventory-page';
import { LoginPage } from '../pages/login-page';

test.describe('Login Successful', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test.afterEach(async () => {
    await inventoryPage.logout();
  });

  test('should redirect to the inventory page after successful login', async ({ page }) => {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveTitle('Swag Labs');
  });

  test('should display name of first inventory item exactly as "Sauce Labs Backpack"', async () => {
    await expect(inventoryPage.inventoryItems.first().locator('.inventory_item_name')).toHaveText(
      'Sauce Labs Backpack',
    );
  });
});
