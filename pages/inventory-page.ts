import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async getInventoryItemByName(name: string): Promise<Locator> {
    return this.inventoryItems.filter({
      has: this.page.locator('.inventory_item_name', { hasText: name }),
    });
  }

  async getAddToCartButtonByItemName(name: string): Promise<Locator> {
    const item = await this.getInventoryItemByName(name);
    return item.getByRole('button', { name: 'Add to cart' });
  }

  async getRemoveFromCartButtonByItemName(name: string): Promise<Locator> {
    const item = await this.getInventoryItemByName(name);
    return item.getByRole('button', { name: 'Remove' });
  }

  async addItemToCartByName(name: string): Promise<void> {
    const addToCartButton = await this.getAddToCartButtonByItemName(name);
    await addToCartButton.click();
  }

  async removeItemFromCartByName(name: string): Promise<void> {
    const removeFromCartButton = await this.getRemoveFromCartButtonByItemName(name);
    await removeFromCartButton.click();
  }
}
