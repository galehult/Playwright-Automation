import type { Page } from '@playwright/test';
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PIMPage } from '../pages/PIMPage';

type MyFixtures = {
    loginPage: LoginPage;
    dashboard: Page;
    pimPage: PIMPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await use(loginPage);
    },

    dashboard: async ({ page, loginPage}, use) => {
        await loginPage.login('Admin', 'admin123');
        await expect(page).toHaveURL('/web/index.php/dashboard/index');
        await use(page);
    },

    pimPage: async ({ page, dashboard}, use) => {
        const pimPage = new PIMPage(page);
        await pimPage.navigation();
        await expect(page).toHaveURL('/web/index.php/pim/viewEmployeeList');
        await use(pimPage);
    }
})

export { expect } from '@playwright/test';