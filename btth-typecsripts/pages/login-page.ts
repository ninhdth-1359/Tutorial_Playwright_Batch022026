
const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export class LoginPage {
  async gotoLoginPage(): Promise<void> {
    console.log('Navigating to login page...');
    await sleep(1000);
    console.log('Arrived at login page.');
  }

  async login(userName: string, password: string): Promise<void> {
    console.log(`Typing username: ${userName}`);
    await sleep(1000);
    console.log(`Typing password: ${password}`);
    await sleep(1000);
    console.log('Login successful.');
  }
}
