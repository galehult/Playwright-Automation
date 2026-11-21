import { type Page, type Locator } from '@playwright/test';


export class LoginPage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly forgotPassword: Locator;
    readonly errorMessage: Locator;
    readonly page: Page;

    constructor(page: Page) {
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.forgotPassword = page.getByText('Forgot your password?', { exact: true });
    this.errorMessage = page.getByText('Invalid credentials');
    this.page = page;
    }

    async navigate() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitLogin();
    }

    async submitLogin() {
        await this.loginButton.click();
    }

    async clickForgotPassword() {
        await this.forgotPassword.click();
    }
}

