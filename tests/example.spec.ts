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
test('Modal Manipulation', async ( { page }) => {
  await page.goto('https://playground.qatools.dev/products');
  await page.getByRole('button', { name: 'Skip tour' }).click();
  const modal = page.getByTestId('share-modal');

  await page
    .getByTestId('product-card-1')
    .locator('[aria-label="View details for Wireless Headphones"]')
    .click();
  await page.getByTestId('share-btn').click();
  await modal.getByTestId('share-copy').click();
  await page.getByTestId('share-btn').click();
  await modal.getByTestId('share-cancel').click;
})

//Active-State Manipulation
test('Active-state scoping', async ({ page }) => {
    await page.goto('https://playground.qatools.dev/challenges');
  await page.getByRole('button', { name: 'Skip tour' }).click();

  const activeFilter = page.locator('.challenge-filter-btn.active');

  await expect(activeFilter).toHaveText('All13');
  await page.getByTestId('challenges-filter-hard').click();
  await expect(activeFilter).toHaveText('Hard4');
})

// Match exactly the 2nd product card
test('Matching the 2nd Product Card', async ( { page }) => {
  await page.goto('https://playground.qatools.dev/products');
  await page.getByRole('button', { name: 'Skip tour' }).click();

  await page.getByTestId('product-card-2');
  await expect(page.getByTestId('product-link-2')).toHaveText('Smart Watch');
  await expect(page.getByTestId('product-card-2')
    .locator('.row')
    .locator('.badge.badge-muted'))
    .toHaveText('Electronics');
  await expect(page.getByTestId('star-rating-2')).toHaveText('★★★★☆(4.2)');
  await expect(page.getByTestId('price-2')).toHaveText('$149.00');

  await expect(page.getByTestId('product-card-2')
    .locator('.product-card-actions')
    .getByRole('button', { name: "Add Smart Watch to cart" }))
    .toHaveText('Add to cart');
  await expect(page.getByTestId('product-card-2')
    .locator('.product-card-actions')
    .locator('.btn-secondary'))
    .toHaveText('Details');
})

// Actionability + Auto-Wait
test('Clicking Confirm after waiting 3 secs to be enabled', async ({ page }) => {
  await page.goto('https://playground.qatools.dev/products');
  await page.getByRole('button', { name: 'Skip tour' }).click();
  await page.getByTestId('nav-widgets').click();


  await page.getByTestId('section-delayed-enable')
    .getByTestId('delayed-start')
    .click();
  await page.getByTestId('section-delayed-enable')
    .getByTestId('delayed-confirm')
    .click();
  await expect(page.getByTestId('section-delayed-enable')
    .getByTestId('delayed-done'))
    .toHaveText('✓ Confirmed');
});

//Filling Text, Email, Password, Search
test('Logging in by using Fill', async ( { page }) => {
  await page.goto('https://playground.qatools.dev/login');
  await page.getByRole('button', { name: 'Skip tour' }).click();

  await page.getByPlaceholder('you@example.com').fill('demo@promptqa.test');
  await page.getByPlaceholder('Your password').fill('Demo@1234');
  await page.getByRole('button', { name: 'Sign in' }).click();
});

//Full Log In Test to Dashboard Hero Validation
test('Login to Dashboard Hero Validation', async ( { page }) => {
  await page.goto('https://playground.qatools.dev/login');
  await page.getByRole('button', { name: 'Skip tour' }).click();

  await page.getByPlaceholder('you@example.com').fill('demo@promptqa.test');
  await page.getByPlaceholder('Your password').fill('Demo@1234');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL('https://playground.qatools.dev/');
  await expect(page.locator('.hero')
    .locator('.hero-brand')
    .locator('.hero-brand-main'))
    .toHaveText('QATools');

  await expect(page.locator('.hero')
    .locator('.hero-brand')
    .locator('.hero-brand-suffix'))
    .toHaveText('playground');
})

//To Be Visible thing
test('To Be Visible', async ( { page }) => {
  await page.goto('https://playground.qatools.dev/products');
  await page.getByRole('button', { name: 'Skip tour'}).click();

  await expect(page.locator("#main-content")).toBeVisible();
});

