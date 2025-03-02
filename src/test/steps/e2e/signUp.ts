import { Given, When, Then } from "@cucumber/cucumber";
import { Page, Browser, chromium } from "playwright";
import { expect } from "@playwright/test";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { Before, After } from "@cucumber/cucumber";
import {  LogInPage } from "../../../page/LogInPage";
import { page} from "../../helpers/hooks"

setDefaultTimeout(20000);
let logInPage : LogInPage;

When("I open the sign-up page", async function (){
    logInPage = new LogInPage(page);
    await logInPage.goto();
});

Then ("I should see the input fields for Name, Email Address and the Signup button", async function(){
await logInPage.verifyUIElementsVisible();
});