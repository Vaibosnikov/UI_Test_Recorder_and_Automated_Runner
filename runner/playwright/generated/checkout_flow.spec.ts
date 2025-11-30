import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {

  test('completes a basic checkout process', async ({ page }) => {

    // Navigate to homepage
    await page.goto(process.env.BASE_URL || 'http://localhost:3000');

    // Assert homepage loaded
    await expect(page.locator('header')).toBeVisible();

    // Navigate to product page
    await page.click('text=Products');
    await expect(page).toHaveURL(/.*products/);

    // Select first product
    const firstProduct = page.locator('.product-card').first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();

    // Add to cart
    await page.click('text=Add to Cart');
    await expect(page.locator('.cart-count')).toContainText('1');

    // Proceed to cart page
    await page.click('text=View Cart');
    await expect(page).toHaveURL(/.*cart/);

    // Proceed to checkout
    await page.click('text=Checkout');
    await expect(page).toHaveURL(/.*checkout/);

    // Fill checkout form
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#address', '221B Baker Street');
    await page.fill('#zip', '123456');

    // Confirm order
    await page.click('text=Place Order');

    // Wait for order confirmation page
    await expect(page.locator('h1')).toContainText('Order Confirmed');

    // Optional visual regression (your integration will replace this)
    if (process.env.VISUAL_REGRESSION === 'true') {
      await page.screenshot({ path: `checkout-confirmation.png`, fullPage: false });
    }
  });

});
