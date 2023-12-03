require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

async function createPDF(imagesFolder, outputPath) {
    const pdfDoc = await PDFDocument.create();

    const imageFiles = fs.readdirSync(imagesFolder).filter(file => file.endsWith('.png'));

    for (const file of imageFiles) {
        const imagePath = path.join(imagesFolder, file);
        const imageBytes = fs.readFileSync(imagePath);
        const image = await pdfDoc.embedPng(imageBytes);

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0 });
    }

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
}

createPDF(process.env.SCREENSHOT_PATH, path.join(process.env.OUTPUT_FILE_PATH, './pdf/diapositives.pdf'))
    .then(() => console.log('PDF created successfully.'))
    .catch(err => console.error('Error creating PDF:', err));
