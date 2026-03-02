import { test as base } from '@playwright/test';
import { InventoryPage } from '../../pages/inventory-page';

type Fixtures = {
  inventoryPage: InventoryPage;
};

export const test = base.extend<Fixtures>({
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
});
