require('dotenv').config();
const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(process.env.SLIDESHOW_URL); // Use URL from .env file

    for (let i = 0; i < 375; i++) {
        await delay(4000); // Wait for animations
        await page.screenshot({ path: `${process.env.SCREENSHOT_PATH}${i}.png` }); // Use path from .env file
        await page.click(process.env.CANVAS_SELECTOR); // Use selector from .env file
    }

    await browser.close();
})();