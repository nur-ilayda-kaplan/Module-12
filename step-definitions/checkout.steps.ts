import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ProductPage } from "../pageObjects/ProductPage";
import { CartPage } from "../pageObjects/CartPage";

Given(
  "the user is on the product page for {string}",
  async function (product: string) {
    const productPage = new ProductPage(this.page);
    await productPage.goto(product);
  },
);

When("they add the item to the cart", async function () {
  const productPage = new ProductPage(this.page);
  await productPage.addToCart();
});

Then("the cart should contain {string} item", async function (count: string) {
  const cart = new CartPage(this.page);
  const c = await cart.itemCount();
  expect(c).toBe(count);
});

Given("the cart has at least one item", async function () {
  const cart = new CartPage(this.page);
  const { config } = await import("../support/config");
  await this.page.goto(`${config.baseUrl}/cart`, {
    waitUntil: "domcontentloaded",
  });
  const c = await cart.itemCount();
  if (parseInt(c || "0") < 1) {
    const productPage = new ProductPage(this.page);
    await productPage.goto("playwright book");
    await productPage.addToCart();
    await this.page.waitForURL(/cart/, { timeout: 10000 });
  }
});

When(
  "the user proceeds to checkout and fills payment details",
  async function () {
    const { config } = await import("../support/config");
    const cart = new CartPage(this.page);
    await cart.checkout();
    await this.page.waitForURL(/checkout/, { timeout: 10000 });

    await this.page.fill(config.selectors.cardNumber, "4111111111111111");
    await this.page.fill(config.selectors.expiry, "12/25");
    await this.page.fill(config.selectors.cvv, "123");
    await this.page.click(config.selectors.submitOrder);
    await this.page.waitForURL(/confirmation/, { timeout: 10000 });
  },
);

Then("the order confirmation page should be shown", async function () {
  await expect(this.page).toHaveURL(/confirmation/);
});
