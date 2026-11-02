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

//Find page-search input
//Find the navbar Cart link
//Find the Cart link WITHOUT a testid

test('Finding Page Search', async ( { page }) => {
  await page.goto('https://playground.qatools.dev/products');
  await page.getByRole('button', { name: 'Skip tour' }).click();
  await page.getByTestId('search-input').click();
})

test('Finding Cart link', async ( { page }) => {
  await page.goto('https://playground.qatools.dev/products');
  await page.getByRole('button', { name: 'Skip tour' }).click();
  await page.getByTestId('nav-cart').click();
  await expect(page.getByTestId('empty-cart')).toHaveText('Your cart is emptyBrowse the catalog to add items to your cart.Shop now');
})

test('Finding Cart without using TestId', async ( { page }) => {
  await page.goto('https://playground.qatools.dev/products');
  await page.getByRole('button', { name: 'Skip tour' }).click();
  await page.locator('[aria-label="Cart with 0 items"]').click();
  await expect(page.getByTestId('empty-cart')).toHaveText('Your cart is emptyBrowse the catalog to add items to your cart.Shop now');
})

//Add to cart for product card 3
test('Add to cart Product 3', async ( { page }) => {
  await page.goto('https://playground.qatools.dev/products');
  await page.getByRole('button', { name: 'Skip tour'}).click();
  console.log(
    'Product cards found',
    await page.getByTestId('add-to-cart-3').count()
  );
  await page
    .getByTestId('product-card-3')
    // .getByRole('button', { name: /Add to cart/ })
    .locator('[aria-label="Add Cotton T-Shirt to cart"]')
    .click();
})

//Share modal, modal-scoped queries
test('Modal Scoping', )