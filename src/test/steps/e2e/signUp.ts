import { Given, When, Then } from "@cucumber/cucumber";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { LogInPage } from "../../../page/LogInPage";
import { page } from "../../helpers/hooks";

setDefaultTimeout(20000);
let logInPage: LogInPage;

Given("I open the sign-up page", async function () {
  logInPage = new LogInPage(page);
  await logInPage.goto();
});

When("I submit in the sign-up form with valid name {string} & email {string}", async function(name:string,email:string){
await logInPage.newUserSignUp(name,email);
});


Then(
  "I should see the input fields for Name, Email Address and the Signup button",
  async function () {
    await logInPage.verifyUIElementsVisible();
  }
);


