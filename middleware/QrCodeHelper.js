const QrCode = require('qrcode');
const QrReader = require('qrcode-reader');


const getQRcodeHash = async (string_data) => {
    let qrCodeHash;

    // Print the QR code to terminal
    QrCode.toString(string_data, { type: 'terminal' }, function (err, url) {
        if (err) return console.log("error occured")
        // console.log(url);
        qrCodeHash = url;
        // return url;
    })
    return qrCodeHash

}

const convertToBase64 = async (string_data) => {
    // Get the base64 url
    let qrCodeHash;
    await QrCode.toDataURL(string_data, function (err, url) {
        if (err) return console.log("error occured")
        // console.log(url);
        qrCodeHash = url;
        return url;
    })
    return qrCodeHash;
}

const saveQrcode2Local = async (string, productID) => {
    // const filename = path.join(process.cwd(), `${string}.png`)
    
    try {
        await QrCode.toFile(`./utils/qrcodes/${productID}.png`, string)
   }
   catch(err) {
       console.log(err);
   }
}



module.exports = { getQRcodeHash, convertToBase64, saveQrcode2Local }