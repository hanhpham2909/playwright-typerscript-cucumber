import { Given, When, Then } from '@cucumber/cucumber';
import { Page, Browser, chromium } from 'playwright';
import { expect } from '@playwright/test';

let page: Page;
let browser: Browser;

Given('I open VNG Club homepage', async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('https://club.vnggames.com/');
});

When('I click on "Nhập Code"', async function () {
  await page.waitForSelector('text=Nhập Code');
  await page.click('text=Nhập Code');
});

Then('Close browser', async function () {

  // Đóng trình duyệt sau khi kiểm tra hoàn tất
  await browser.close();
});
