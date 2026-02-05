import { LoginPage} from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

async function testLogin(): Promise<void> {
  await(loginPage.gotoLoginPage());
  await(loginPage.login('tester', 'password123'));
  await(dashboardPage.verifyLoginSuccess());
}

// Run the test
testLogin();
