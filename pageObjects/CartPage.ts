import { Page } from 'playwright';
import { config } from '../support/config';

export class CartPage {
  constructor(private page: Page) {}

  async itemCount() {
    try {
      return await this.page.textContent(config.selectors.cartCount, {
        timeout: config.waitTimeout,
      });
    } catch {
      return '0';
    }
  }

  async checkout() {
    try {
      await this.page.click(config.selectors.checkoutButton, {
        timeout: config.waitTimeout,
      });
    } catch (error) {
      console.error('Checkout failed:', error);
      throw error;
    }
  }
}
