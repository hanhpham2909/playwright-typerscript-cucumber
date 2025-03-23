import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LogInPage extends BasePage {
  readonly signInUpCTA: Locator;
  readonly nameInputField: Locator;
  readonly emailSignUpField: Locator;
  readonly signUpButton: Locator;
  readonly errorMess: Locator;

  constructor(page: Page) {
    super(page)
    this.signInUpCTA = page.locator('a[href="/login"]');
    this.nameInputField = page.locator("//input[@data-qa='signup-name']");
    this.emailSignUpField = page.locator("(//input[@name='email'])[2]");
    this.signUpButton = page.locator("(//button[@class='btn btn-default'])[2]");
    this.errorMess = page.locator(
      "//p[normalize-space(text())='Your email or password is incorrect!']"
    );
  }
  

  async gotoLoginPage() {
    await this.goto("/login")
  }

  async verifyUIElementsVisible() {
    const fields = [
      { element: this.nameInputField, name: "Name Input Field" },
      { element: this.emailSignUpField, name: "Email and Address Input Field" },
      { element: this.signUpButton, name: "Signun Button " },
      { element: this.errorMess, name: "Error mess " },
    ];

    for (const field of fields) {
      if (await field.element.isVisible()) {
        await expect(field.element).toBeVisible();
      } else {
        console.log("Missing" + field.name);
      }
    }
  }
}
