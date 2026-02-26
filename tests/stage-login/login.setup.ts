import { test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../../pages/login-page';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Tạo thư mục auth nếu chưa có
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
    console.log('📁 Created auth directory');
  }

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.verifyLoginSuccess();

  // Lưu trạng thái vào file auth.json
  await page.context().storageState({ path: authFile });
  console.log('💾 Auth state saved to:', authFile);

  // Verify file được tạo
  if (fs.existsSync(authFile)) {
    console.log('✅ Auth file created successfully!');
  }
});
