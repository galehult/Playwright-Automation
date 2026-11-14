import { Page, Locator } from '@playwright/test';

export class LoginButton {
    readonly page: Page;
    readonly button: Locator;

    constructor(page: Page) {
        this.page = page;
        this.button = page.getByRole('button', { name: 'LOG IN'});
    }

    async click() {
        await this.button.click();
    }
}