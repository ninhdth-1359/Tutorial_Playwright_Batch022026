import { expect, test } from '@playwright/test';

// Test này sẽ sử dụng auth state đã được tạo trong login.setup.ts, nên không cần phải login lại
test('login test', async ({ page }) => {
  // Truy cập trang inventory (đã login)
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Verify trang inventory load thành công
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.getByText('Products')).toBeVisible();
});
