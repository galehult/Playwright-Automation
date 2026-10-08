import { test, expect } from '@playwright/test';

test('has title', async ({ page}) => {
  await page.goto('https://playwright.dev');

  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await page.getByRole('link', { name: 'Get started' }).click();

  await expect(page.getByRole('heading', { name: 'Installation'})).toBeVisible();
});

// test.describe(`TO DESCRIBE THE TEST`, () => {
//   test('one', async ({ page }) => {
//     // test code...
//   });

//   test('two', async ({ page }) => {
//     //test code...
//   })
// });