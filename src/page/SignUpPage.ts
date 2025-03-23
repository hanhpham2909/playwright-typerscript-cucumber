import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignUpPage extends BasePage {
  readonly titlePage: Locator;
  readonly nameInputField: Locator;
  readonly emailSignUpField: Locator;
  readonly signUpButton: Locator;
  readonly genderMan: Locator;
  readonly genderWoman: Locator;
  readonly passwordsField: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly addressField: Locator;
  readonly countryField: Locator;
  readonly indiaOption: Locator;
  readonly usOption: Locator;
  readonly canadaOption: Locator;
  readonly israelOption: Locator;
  readonly newZealandOption: Locator;
  readonly singapore: Locator;
  readonly austraOption: Locator;
  readonly nameAccountInfo: Locator;
  readonly emailAccountInfo: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly phoneInput: Locator;
  readonly createAccountButton: Locator;
  readonly successNotice: Locator;

  constructor(page: Page) {
    super(page);
    this.titlePage = page.locator(
      "//b[normalize-space(text())='Enter Account Information']"
    );
    this.nameInputField = page.locator("//input[@data-qa='signup-name']");
    this.emailSignUpField = page.locator("(//input[@name='email'])[2]");
    this.signUpButton = page.locator("(//button[@class='btn btn-default'])[2]");
    this.genderMan = page.locator("(//input[@name='title'])[1]");
    this.genderWoman = page.locator("(//input[@type='radio'])[2]");
    this.nameAccountInfo = page.locator("#name");
    this.firstNameField = page.locator("#first_name");
    this.lastNameField = page.locator("#last_name");
    this.addressField = page.locator("#address1");
    this.countryField = page.locator("#country");
    this.indiaOption = page.locator("//option[@value='India']");
    this.usOption = page.locator("//option[@value='United States']");
    this.canadaOption = page.locator("//option[@value='Canada']");
    this.israelOption = page.locator("//option[@value='Israel']");
    this.newZealandOption = page.locator("//option[@value='New Zealand']");
    this.singapore = page.locator("//option[@value='Singapore']");
    this.austraOption = page.locator("//option[@value='Australia']");
    this.emailAccountInfo = page.locator("#email");
    this.passwordsField = page.locator("#password");
    this.stateInput = page.locator("#state");
    this.cityInput = page.locator("#city");
    this.zipcodeInput = page.locator("#zipcode");
    this.phoneInput = page.locator("#mobile_number");
    this.createAccountButton = page.locator(
      "(//button[@class='btn btn-default'])[1]"
    );
    this.successNotice = page.locator("//h2[@data-qa='account-created']//b[1]");
  }

  async gotoSignUpPage() {
    await this.goto("/login");
  }

  async signUp(name: string, email: string) {
    await this.nameInputField.fill(name);
    await this.emailSignUpField.fill(email);
    await this.signUpButton.click();
    await this.page.waitForLoadState("domcontentloaded");
    //  cần chờ DOM tải xong trước khi tiếp tục
    await expect(this.nameAccountInfo).toHaveValue(`${name}`);
    await expect(this.emailAccountInfo).toHaveValue(`${email}`);
  }
  async fillSignUpForm(userData: {
    gender: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    phone: string;
  }) {
    // if (userData.gender.toLowerCase() === "male") {
    //   await this.genderMan.click();
    // } else if (userData.gender.toLowerCase() === "female") {
    //   await this.genderWoman.click();
    // }

    // Optimize gender selection section
    const genderLocator =
      userData.gender.toLowerCase() === "male"
        ? this.genderMan
        : this.genderWoman;
    await genderLocator.click();

    await this.fillInput(this.passwordsField, userData.password);
    await this.fillInput(this.firstNameField, userData.firstName);
    await this.fillInput(this.lastNameField, userData.lastName);
    await this.fillInput(this.addressField, userData.address);
    await this.countryField.click();

    // country là dạng list option
    // const countryList = [
    //   { element: this.indiaOption, name: "India" },
    //   { element: this.usOption, name: "United States" },
    //   { element: this.canadaOption, name: "Canada" },
    //   { element: this.israelOption, name: "Israel" },
    //   { element: this.newZealandOption, name: "New Zealand" },
    //   { element: this.singapore, name: "Singapore" },
    //   { element: this.austraOption, name: "Australia" },
    // ];
    // for (const countryName of countryList) {
    //   if (userData.country === countryName.name) {
    //     await countryName.element.click();
    //   }
    // }

    // Sử dụng Select options thay vì vòng lặp for như trên
    await this.countryField.selectOption(userData.country);

    //Fill State
    await this.stateInput.fill(userData.state);
    await this.cityInput.fill(userData.city);
    await this.zipcodeInput.fill(userData.zipCode);
    await this.phoneInput.fill(userData.phone);

    await this.clickButton(this.createAccountButton);
  }

  async verifyCreateAccountSuccess() {
    await expect(this.page).toHaveURL(
      "https://automationexercise.com/account_created"
    );
    await expect(this.successNotice).toHaveText("Account Created!");
  }
};
