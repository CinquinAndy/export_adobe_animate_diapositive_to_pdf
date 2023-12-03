const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('URL_DE_VOTRE_PAGE_WEB'); // Remplacez avec l'URL de votre page web

    for (let i = 0; i < 375; i++) {
        await page.waitFor(3000); // Attendre 3 secondes
        await page.screenshot({ path: `diapo_${i}.png` }); // Sauvegarde de la diapo
        await page.click('SELECTEUR_CANVAS'); // Remplacez avec le bon sélecteur pour cliquer sur le canvas
    }

    await browser.close();
})();