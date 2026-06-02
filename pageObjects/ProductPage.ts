import { Page } from 'playwright';
import { config } from '../support/config';

export class ProductPage {
  constructor(private page: Page) {}

  async goto(productName: string) {
    await this.page.goto(`${config.baseUrl}/products/${encodeURIComponent(productName)}`, {
      waitUntil: 'domcontentloaded',
    });
  }

  async addToCart() {
    try {
      await this.page.click(config.selectors.addToCartButton, {
        timeout: config.waitTimeout,
      });
    } catch (error) {
      console.error('Add to cart failed:', error);
      throw error;
    }
  }
}
