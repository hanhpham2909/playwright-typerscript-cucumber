import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto("https://automationexercise.com");
    await this.page.locator(`a[href='${path}']`).click();
    await expect(this.page).toHaveURL(`https://automationexercise.com${path}`);
  }
  async fillInput(locator: Locator, value: string) {
    await locator.fill(value);
  }
  async clickButton(selector: string | Locator) {
    if(typeof selector === "string"){
      await this.page.locator(selector).click();
  } else {await selector.click()}
}
}
