require('dotenv').config();
const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const timeout = 5000;
    const totalSlides = 235;
    page.setDefaultTimeout(timeout);
    await page.setViewport({ width: 1050, height: 780 });
    await page.goto(process.env.SLIDESHOW_URL); // Use URL from .env file

    await delay(4000);
    await page.screenshot({ path: `init.png` }); // Use path from .env file
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Médecine)'),
            targetPage.locator('#form1'),
            targetPage.locator('::-p-xpath(//*[@id=\\"form1\\"])'),
            targetPage.locator(':scope >>> #form1')
        ])
            .setTimeout(timeout)
            .click({
                offset: {
                    x: 4.630126953125,
                    y: 3.221923828125,
                },
            });
    }
    await delay(4000);
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#canvas'),
            targetPage.locator('::-p-xpath(//*[@id=\\"canvas\\"])'),
            targetPage.locator(':scope >>> #canvas')
        ])
            .setTimeout(timeout)
            .click({
                offset: {
                    x: 809.2755737304688,
                    y: 21.09659194946289,
                },
            });
    }

    for (let i = 0; i < totalSlides; i++) {
        await delay(4000); // Wait for animations
        await page.screenshot({ path: `${process.env.SCREENSHOT_PATH}${i}.png` }); // Use path from .env file
        {
            const targetPage = page;
            await puppeteer.Locator.race([
                targetPage.locator('#canvas'),
                targetPage.locator('::-p-xpath(//*[@id=\\"canvas\\"])'),
                targetPage.locator(':scope >>> #canvas')
            ])
                .setTimeout(timeout)
                .click({
                    offset: {
                        x: 809.2755737304688,
                        y: 21.09659194946289,
                    },
                });
        }
    }

    await browser.close();
})();