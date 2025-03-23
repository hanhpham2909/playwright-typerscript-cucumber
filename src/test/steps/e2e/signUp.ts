import { Given, When, Then } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { SignUpPage } from "../../../page/SignUpPage";
import { page } from "../../helpers/hooks";

setDefaultTimeout(20000);
let signUpPage: SignUpPage;

Given("I open the sign-up page", async function () {
  signUpPage = new SignUpPage(page);
  await signUpPage.gotoSignUpPage();
});

When(
  "I submit in the sign-up form with valid name {string} and email {string}",
  async function (name: string, email: string) {
    await signUpPage.signUp(name, email);
  }
);

When("I fill my information:", async function (dataTable) { // Đây là dữ liệu dạng bảng (dataTable) được truyền từ file .feature
  const data = dataTable.hashes()[0]; //Chuyển đổi dữ liệu từ bảng (dataTable) thành một object key-value trong JavaScript.
  await signUpPage.fillSignUpForm({
    gender: data.gender,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    country: data.country,
    state: data.state,
    city: data.city,
    zipCode: data.zipCode,
    phone: data.phone,
  });

});

Then(
  "Then I successfully create an account",
  async function () {
    await signUpPage.verifyCreateAccountSuccess();
  }
);
