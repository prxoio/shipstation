
async function generateDataMatrixBarcode(text: string, type: string) {
    const BwipJs = require("bwip-js");
    const canvas = document.createElement("canvas");
    canvas.width = 25; // Width in pixels
    canvas.height = 25; // Height in pixels

    const opts = {
        bcid: type, // Barcode type
        text, // Text to encode
        scale: 1, // Adjust this as needed
        includetext: true, // Show human-readable text
        textxalign: 'center', // Text alignment
    };

    await BwipJs.toCanvas(canvas, opts);
    const data = canvas.toDataURL("image/png");
    console.log(data);
    return data;
}

export default generateDataMatrixBarcode;
