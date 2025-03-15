import { Before, After } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "@playwright/test";
import { before } from "node:test";

let browser: Browser;
let page: Page;

Before(async function () {
  console.log("🚀 Launching browser");
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage(); // Tạo phiên trình duyệt riêng biệt, mới hoàn toàn
  this.page = page;
});

After(async function () {
  console.log("🛑 Closing browser...");
  await browser.close();
});

export { page };
