import { Page } from "playwright";
import { config } from "../support/config";

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(`${config.baseUrl}/login`, {
      waitUntil: "domcontentloaded",
    });
  }

  async login(username: string, password: string) {
    try {
      await this.page.fill(config.selectors.usernameInput, username, {
        timeout: config.waitTimeout,
      });
      await this.page.fill(config.selectors.passwordInput, password, {
        timeout: config.waitTimeout,
      });
      await this.page.click(config.selectors.submitButton, {
        timeout: config.waitTimeout,
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  async getErrorMessage() {
    try {
      return await this.page.textContent(config.selectors.errorMessage, {
        timeout: config.waitTimeout,
      });
    } catch {
      return null;
    }
  }
}
