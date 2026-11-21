import { test, expect } from '../fixtures/fixtures';
import { LoginPage } from '../pages/LoginPage';


test('Login with valid username and password', async ({ page, loginPage }) => {
    await loginPage.login('Admin', 'admin123');
    await expect(page).toHaveURL('/web/index.php/dashboard/index');
});

test('Login with invalid username', async ({ page, loginPage }) => {
    await loginPage.login('InvalidUsername', 'admin123');;
    await expect(page.getByText('Invalid credentials')).toBeVisible();
});

test('Login with invalid password', async ({ page, loginPage }) => {
    await loginPage.login('Admin', 'invalidpassword');
    await expect(page.getByText('Invalid credentials')).toBeVisible();
});

test('Login with both credentials invalid', async ({ page, loginPage }) => {
    await loginPage.login('Addme', 'addmen123');
    await expect(page.getByText('Invalid credentials')).toBeVisible();
});

test('Submit with empty username and password', async ({ page, loginPage }) => {
    await loginPage.submitLogin();
    const messages = page.locator('.oxd-input-field-error-message');

    await expect(messages).toHaveCount(2);
    const texts = await messages.allTextContents();
    expect(texts).toEqual(['Required', 'Required']);
});

test('Submit with empty username only', async ({ page, loginPage }) => {
    await loginPage.login('', 'admin123');
    await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
});

test('Submit with empty password only', async ({ page, loginPage }) =>{
    await loginPage.login('Admin', '');
    await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
});

test('Password is masked', async ({ page, loginPage }) => {
    await page.getByPlaceholder('Password').fill('admin123');
    await expect(page.getByPlaceholder('Password')).toHaveText('');
});

test('Navigate to Forgot Password', async ({ page, loginPage }) =>{
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL('/web/index.php/auth/requestPasswordResetCode');
});

test('Access Dashboard without authentication', async ({ page, loginPage }) => {
    await loginPage.login('', 'admin123');
    await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
    await expect(page).toHaveURL('/web/index.php/auth/login');
})