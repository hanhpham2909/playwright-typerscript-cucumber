import { Before, After, Status } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "@playwright/test";
import { before } from "node:test";
import fs from "fs"; // Import module fs để làm việc với hệ thống file
import path from "path"; //Import module path để thao tác với đường dẫn file

let browser: Browser;
let page: Page;

Before(async function () {
  console.log("🚀 Launching browser");
  browser = await chromium.launch({ headless: false }); // Mở trình duyệt Chromium ở chế độ có giao diện
  const context = await browser.newContext();
  page = await context.newPage(); // Tạo phiên trình duyệt riêng biệt, mới hoàn toàn
  this.page = page;
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) { // Kiểm tra nếu scenario thất bại
    const timestamp = new Date().toISOString().replace(/[:.]/g, "_");// Tạo timestamp để đặt tên file
    const screenshotPath = path.join(
      "test-results",
      `fail_${scenario.pickle.name}_${timestamp}.png`
    ); // Định nghĩa đường dẫn lưu ảnh

    console.log(
      `📸 Capturing screenshot for failed scenario: ${scenario.pickle.name}` 
    ); //  Log thông báo chụp màn hình
    await page.screenshot({ path: screenshotPath, fullPage: true });
  }

  console.log("🛑 Closing browser...");
  await browser.close();
});

export { page };
