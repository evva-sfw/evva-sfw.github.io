import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/EVVA Developer/);
});

test('page has table', async ({ page }) => {
  await page.goto('http://localhost:4321/specifications/overview/');

  const table = page.locator('div.sl-markdown-content > table');
  await expect(table).toBeVisible();
});

test('landing page has 5 icons with paths or groups', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  const cards = page.locator('article.card');

  await expect(cards).toHaveCount(5);

  const cardCount = await cards.count();
  for (let i = 0; i < cardCount; i++) {
    const icon = cards.nth(i).locator('.title > svg');
    await icon.scrollIntoViewIfNeeded();
    await expect(icon).toBeVisible();

    // Looks for a <g> OR a <path> inside
    const svgContent = icon.locator('g, path').first();
    await expect(svgContent).toBeVisible();
  }
});

test('search works via Ctrl+K and shows live results', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // Open search
  await page.keyboard.press('Control+k');

  // Locate the search input and ensure it's visible/focused
  const searchInput = page.locator('input[type="text"], .pagefind-ui__search-input');
  await expect(searchInput).toBeVisible();

  // Type search query
  const query = 'mobile';
  await searchInput.fill(query);

  // Wait for results
  const results = page.locator('.pagefind-ui__results');

  // Expect first result visible
  await expect(results.first()).toBeVisible();

  // Check results count more than 0
  const count = await results.count();
  expect(count).toBeGreaterThan(0);

  // Verify that search result contains search query
  await expect(results.first()).toContainText(query, { ignoreCase: true });
});

test('cylinder page has icon symbol', async ({ page }) => {
  await page.goto('http://localhost:4321/domain/access-components/types/cylinder/');

  const symbol = page.getByRole('img', { name: 'Cylinder symbol.' });
  // Wait for the image to load

  await expect(symbol).toBeVisible({ timeout: 10000 });

  const isImageLoaded = await symbol.evaluate((img) => {
    const imageElement = img as HTMLImageElement;
    return imageElement.complete && imageElement.naturalWidth > 0;
  });

  expect(isImageLoaded).toBe(true);
});

test('page has a codeblock', async ({ page }) => {
  await page.goto('http://localhost:4321/xesarsoftware/interface-access/');

  const firstBashTerminal = page
    .locator('div.expressive-code > figure.is-terminal > pre[data-language="bash"]')
    .first();

  await firstBashTerminal.scrollIntoViewIfNeeded();

  await expect(firstBashTerminal).toBeVisible();

  await expect(firstBashTerminal).toContainText('TOKEN=$(curl');
});

test('sidebar 5 top level sections', async ({ page }) => {
  await page.goto('http://localhost:4321/domain/overview/');

  const sidebar = page.locator('div.sidebar-content ul.top-level');

  const listItems = sidebar.locator('> li');

  const count = await listItems.count();

  expect(count).toBe(5);
});
