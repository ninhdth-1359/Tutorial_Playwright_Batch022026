import { test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../../pages/login-page';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  //Tao thu muc auth neu chua ton tai
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
    console.log('📁 Created auth directory');
  }

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.verifyLoginSuccess();

  //Luu trang thai vao file auth.json
  await page.context().storageState({ path: authFile });
  console.log('✅ Authentication state saved to', authFile);

  //verify file da duoc luu
  if (fs.existsSync(authFile)) {
    console.log('✅ Authentication file exists');
  } else {
    console.error('❌ Authentication file was not created');
  }
});
