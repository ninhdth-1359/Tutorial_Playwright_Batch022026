import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';

//File nay se khong su dung auth state tu file .json do can chay test login, nen khong can import auth state tu file .json
test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.verifyLoginSuccess();
});
