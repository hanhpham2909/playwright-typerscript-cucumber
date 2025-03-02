import { Given, When, Then } from "@cucumber/cucumber";
import { Page, Browser, chromium } from "playwright";
import { expect } from "@playwright/test";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { Before, After } from "@cucumber/cucumber";
import { getValidationMessage } from "../../helpers/validationField/validationHelper";

let page: Page;
let browser: Browser;
setDefaultTimeout(20000); // Thời gian chờ mặc định của Cucumber là 500ms, dễ gặp lỗi Error: Timeout of 500ms exceeded.  nếu không tự động set timeout cho kịch bản chạy
let emailField;
let passwordField;
let inputEMail: string;

// Optimize browser setup
Before(async function () {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
});

After(async function () {
  await browser.close();
});

Given("I open Automation Excercise", async function () {
  browser = await chromium.launch({ headless: true });
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
  }
);

When(
  "I log in with the invalid email {string}",
  async function (email: string) {
    inputEMail = email;
    await page.locator("(//input[@name='email'])[1]").fill(email);
    await page.getByRole("button", { name: "Login" }).click();
  }
);

Then("I check the title of web", async function () {
  await expect(page).toHaveTitle(/Automation Exercise/);
  await browser.close();
});

Then(
  "I should not be able to log in successfully and displayed error message",
  async function () {
    //Cách xử lý toast message trả về thường gặp ở field input, không thể xác định locator trên DOM:  dùng validationMessage  vì nó kiểm tra thuộc tính của input khi có message trả về
    emailField = page.locator('input[name="email"]').nth(0);
    this.errorMessage = await getValidationMessage(emailField);
    console.log(this.errorMessage);
    if (inputEMail === "") {
      expect(this.errorMessage).toBe("Please fill out this field.");
    } else if (!inputEMail.includes("@")) {
      //Dấu ! (phủ định) đảo ngược giá trị true thành false và ngược lại. Nghĩa là nghĩa là "inputType không chứa '@'"
      expect(this.errorMessage).toBe(
        `Please include an '@' in the email address. '${inputEMail}' is missing an '@'.`
      );
    } else if (inputEMail.endsWith("@")) {
      // Kiểm tra ký tự cuối cùng của data input
      expect(this.errorMessage).toBe(
        `Please enter a part following '@'. '${inputEMail}' is incomplete.`
      );
    } else {
      passwordField = page.locator("//input[@data-qa='login-password']");
      this.errorMessage = await getValidationMessage(passwordField);
      console.log(this.errorMessage);
      expect(this.errorMessage).toBe("Please fill out this field.");
    }
  }
);
