import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';

Given('the user is on the login page', async function () {
  const login = new LoginPage(this.page);
  await login.goto();
});

When('they enter valid credentials', async function () {
  const login = new LoginPage(this.page);
  await login.login('standard_user', 'secret');
  await this.page.waitForTimeout(1000);
});

When('they enter an invalid password', async function () {
  const login = new LoginPage(this.page);
  await login.login('standard_user', 'wrong');
  await this.page.waitForTimeout(500);
});

Then('they should be redirected to the dashboard', async function () {
  await expect(this.page).toHaveURL(/dashboard/);
});

Then('the username input field should be visible', async function () {
  const { config } = await import('../support/config');
  const input = await this.page.$(config.selectors.usernameInput);
  expect(input).toBeTruthy();
});

Then('the error message element should exist', async function () {
  const { config } = await import('../support/config');
  const errorEl = await this.page.$(config.selectors.errorMessage);
  expect(errorEl).toBeTruthy();
});
