import { expect, type Locator, type Page } from "@playwright/test";

export class LogInPage {
  readonly page: Page;
  readonly signInUpCTA: Locator;
  readonly nameInputField: Locator;
  readonly emailSignUpField: Locator;
  readonly signUpButton: Locator;
  readonly errorMess: Locator;
  readonly titleMr : Locator;
  readonly titleMrs : Locator;
  readonly nameAccountInfo : Locator;
  readonly emailAccountInfo : Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInUpCTA = page.locator('a[href="/login"]');
    this.nameInputField = page.locator("//input[@data-qa='signup-name']");
    this.emailSignUpField = page.locator("(//input[@name='email'])[2]");
    this.signUpButton = page.locator("(//button[@class='btn btn-default'])[2]");
    this.errorMess = page.locator(
      "//p[normalize-space(text())='Your email or password is incorrect!']"
    );
    this.titleMr = page.locator('#id_gender1') ;
    this.titleMrs = page.locator('#id_gender2') ;
    this.nameAccountInfo = page.locator('#name');
    this.emailAccountInfo = page.locator('#email');
  }

  async goto() {
    await this.page.goto("https://automationexercise.com");
    await this.signInUpCTA.click();
    await expect(this.page).toHaveURL("https://automationexercise.com/login");
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
  async newUserSignUp(name: string, email: string) {
    await this.nameInputField.fill(name);
    await this.emailSignUpField.fill(email);
    await this.signUpButton.click();
    await expect(this.page).toHaveURL("https://automationexercise.com/signup");
    await expect(this.nameAccountInfo).toHaveValue(`${name}`);
    await expect(this.emailAccountInfo).toHaveValue(`${email}`);
    // if (gender = "male"){
    //     this.titleMr.click();
    // } else (gender = "female"){
    //     this.titleMrs.click();
    // }  

  }

}
