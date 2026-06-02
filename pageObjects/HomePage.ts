import { Page } from 'playwright';
import { config } from '../support/config';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(config.baseUrl, { waitUntil: 'domcontentloaded' });
  }

  async search(term: string) {
    try {
      await this.page.fill(config.selectors.searchInput, term, {
        timeout: config.waitTimeout,
      });
      await this.page.press(config.selectors.searchInput, 'Enter');
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    }
  }

  async getNoResultsMessage() {
    try {
      return await this.page.textContent('[data-testid="no-results"]', {
        timeout: config.waitTimeout,
      });
    } catch {
      return null;
    }
  }
}
