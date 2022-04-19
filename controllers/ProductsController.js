const db = require('../database');
const { getQRcodeHash, convertToBase64, saveQrcode2Local } = require('../middleware/QrCodeHelper');
const QrCode = require('qrcode');
var QrCode_reader = require('qrcode-reader');
const fs = require('fs');
var Jimp = require('jimp');
const path = require('path');
var Canvas = require('canvas'), Image = Canvas.Image, QRCODE = require('jsqrcode')(Canvas)



// add a new product to the store that hotnot have
exports.addNewProduct = async (req, res) => {

    const { title, description, cost_prize, selling_prize, quantity } = req.body;

    const currentDate = new Date();
    let createdAt = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`

    const product = {
        "title": title,
        "description": description,
        "cost_prize": cost_prize,
        "selling_prize": selling_prize,
        "createdAt": createdAt,
        "quantity": quantity
    }

    let string_data = JSON.stringify(product);

    try {

        //get qrcode hash from the string data
        QrCode.toString(string_data, { type: 'terminal' }, function (err, url) {
            if (err) return console.log("error occured")
            try {

                // add a new product in the database
                let query = `insert into hotnot_store.product (title, description, selling_prize, cost_prize, qrCode_hash , createdAt, quantity ) values ('${title}', '${description}', '${selling_prize}', '${cost_prize}', '${url}', '${createdAt}', '${quantity} ' );`
                db.query(query, (err, result) => {
                    try {
                        if (err) {
                            console.log(err);
                            res.status(400).json(err.message);
                        } else {
                            // console.log(result);
                            res.status(200).json({ data: result });
                        }
                    }
                    catch (err) {
                        console.log(err);
                        res.status(400).json(err.message);
                    }

                })

                // fetch that same product with creadted at
                let fetch_query = `SELECT productID FROM hotnot_store.product WHERE (createdAt = '${createdAt}')`
                var product_ID;
                db.query(fetch_query, (err, proID) => {
                    if (err) return res.status(400).json(err.message);
                    product_ID = proID[0].productID;

                    // save the qrcode with name of productID in the utils
                    const data_to_convert_in_string = {
                        "title": title,
                        "description": description,
                        "cost_prize": cost_prize,
                        "selling_prize": selling_prize,
                        "createdAt": createdAt,
                        "quantity": quantity,
                        "productID": product_ID
                    }
                    const data_to_pass = JSON.stringify(data_to_convert_in_string);

                    saveQrcode2Local(data_to_pass, product_ID);
                })
            }
            catch (error) {
                res.status(500).json(error.message);
            }
        })
    }
    catch (error) {
        res.status(500).json(error.message);
    }

}

// get all products that hotnot have
exports.getAllProductsInStore = async (req, res) => {

    let query = `SELECT * FROM hotnot_store.product;`

    db.query(query, (err, data) => {
        if (err) return res.status(500).json({ msg: err.message });
        else return res.status(200).json(data);
    })
}


// get a particular product that hotnot have (Fetch through qrCode hash)
exports.getAProductFromQRCode = async (req, res) => {

    try {

        var buffer = req.file;
        console.log(buffer.filename);
        console.log(buffer.path);

        // read the qr code
        Jimp.read(buffer.path, (err, image) => {
            if (err) {
                console.error(err);
                res.status(400).json(err.message);
            }
            
            var qrcode = new QrCode_reader();
            qrcode.callback = function (err, value) {
                if (err) {
                    console.error(err);
                    res.status(400).json(err.message);
                }
                // Printing the decrypted value
                // console.log(value.result);
                let product = JSON.parse(value.result);
                res.status(200).json(product);
            };
            // Decoding the QR code
            qrcode.decode(image.bitmap);



        })

        // delete the buffer file
        fs.unlinkSync(`${buffer.path}`);

    }
    catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }


}


// get a particular product that hotnot have (Fetch through productID)
exports.getAProductFromID = async (req, res) => {

    const product_id = req.params.id;

    let query = `SELECT * FROM hotnot_store.product WHERE(productID = '${product_id}'); `

    db.query(query, (err, product) => {

        if (err) return res.status(400).json(err.message);
        else return res.status(200).json(product);
    })
}

// add stock of a particular product in store
exports.addStockINStore = async (req, res) => {

    const product_id = req.params.id;
    const { quantity } = req.body;

    if (!(quantity)) {
        return res.status(500).json({ msg: "add quantity to add in store" })
    }


    let query = `SELECT quantity FROM hotnot_store.product WHERE(productID = '${product_id}'); `

    db.query(query, (err, database_quantity) => {

        if (err) return res.status(400).json(err.message);

        try {

            let newQuantity = parseInt(database_quantity[0].quantity) + parseInt(quantity);

            // update the quantity
            let update_query = `UPDATE hotnot_store.product SET quantity = ${newQuantity} WHERE (productID = '${product_id}') `
            db.query(update_query, (err, data) => {
                if (err) return res.status(500).json(err.message);
                else return res.status(200).json({ msg: "Added successfully", data: data });

            })




        }
        catch (error) {
            return res.status(400).json(error.message);
        }


    })




}


// delete a product
exports.deleteProduct = async (req, res) => {

    const product_id = req.params.id;

    let query = `DELETE FROM hotnot_store.product WHERE (productID = '${product_id}')`

    db.query(query, (err, data) => {

        if (err) return res.status(500).json(err.message);
        else return res.status(200).json({ msg: "Deleted successfully", data: data });

    })

}


//update the product details
exports.updateProduct = async (req, res) => {

    try {
        const product_id = req.params.id;
        const { title, description, cost_prize, selling_prize } = req.body;

        //get the updated date
        const currentDate = new Date();
        let updatedAt = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`

        if (!(title && description && cost_prize && selling_prize)) {
            return res.status(400).json({ msg: "Fill the details correctly! Some property is not Filled" });
        }
        else {
            //update query
            let query = `UPDATE hotnot_store.product SET title='${title}' , description='${description}' , cost_prize='${cost_prize}', selling_prize='${selling_prize}', updatedAt='${updatedAt}' WHERE (productID='${product_id}')`

            try {
                db.query(query, (err, data) => {
                    if (err) return res.status(400).json(err.message);
                    res.status(200).json({ msg: "updated successfully", data: data });
                })
            }
            catch (err) {
                res.status(400).json(err.message)
            }
        }

    }
    catch (err) {
        res.status(400).json(err.message)
    }
}







