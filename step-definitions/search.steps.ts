import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { HomePage } from "../pageObjects/HomePage";

Given("the user is on the home page", async function () {
  const home = new HomePage(this.page);
  await home.goto();
});

When("they search for {string}", async function (term: string) {
  const home = new HomePage(this.page);
  await home.search(term);
  await this.page.waitForTimeout(500);
});

Then("the search input should be available", async function () {
  const { config } = await import("../support/config");
  const input = await this.page.$(config.selectors.searchInput);
  expect(input).toBeTruthy();
});

Then("the page should load successfully", async function () {
  const url = this.page.url();
  expect(url).toContain("localhost");
  const content = await this.page.content();
  expect(content).toBeTruthy();
  expect(content?.length).toBeGreaterThan(0);
});
