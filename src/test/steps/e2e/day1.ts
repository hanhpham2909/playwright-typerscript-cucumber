import { Given, When, Then } from "@cucumber/cucumber";
import { Page, Browser, chromium } from "playwright";
import { expect } from "@playwright/test";
import { setDefaultTimeout } from "@cucumber/cucumber";

let page: Page;
let browser: Browser;
setDefaultTimeout(20000);
let errorMessage;
let passwordField;

Given("I open Automation Excercise", async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("https://automationexercise.com");
});

When("I click on the SignIn cta in the Header", async function () {
  await page.click('a[href="/login"]');
});

When(
  "I click the Log In button without filling in any data",
  async function () {
    await page.getByRole("button", { name: "Login" }).click();
    passwordField = page.locator('input[name="email"]').nth(0);
    errorMessage = await passwordField.evaluate(
      (input) => (input as HTMLInputElement).validationMessage
    );
    console.log(errorMessage);
  }
);

When("I log in with the invalid {email}", async function (email: string) {
  await page.locator('input[name="email"]').nth(0).fill(email);
  await page.getByRole("button", { name: "Login" }).click();
  passwordField = page.locator('input[name="email"]').nth(0);
  errorMessage = await passwordField.evaluate(
    (input) => (input as HTMLInputElement).validationMessage
  );
  console.log(errorMessage);
});

Then("I check the title of web", async function () {
  await expect(page).toHaveTitle(/Automation Exercise/);
  await browser.close();
});

Then(
  "I should not be able to log in successfully and displayed error message",
  async function (errorMessage) {
    await expect(errorMessage).toBeVisible();
  }
);

// Then("I should not be able to log in successfully", async function () {
//   await expect(page).
// });
