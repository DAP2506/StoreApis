const db = require('../database');
const addUser = require('../middleware/cartHelper');
const PDFtemplet = require('../middleware/PDFtemplet');
const pdf = require('html-pdf');
const PDF = require('html-pdf/lib/pdf');


// fetch a cart
exports.fetchACart = async (req, res) => {

    const cart_id = req.params.id;

    let query = `SELECT * FROM hotnot_store.cart WHERE (cartID = '${cart_id}')`

    db.query(query, (err, data) => {
        if (err) return res.status(400).json(err.message);

        // console.log(data[0]);
        return res.status(200).json(data[0]);
    })


}



// make cart for a user and add cartID into users schema
exports.makeACartForUser = async (req, res) => {



    try {
        // fetch a user from phoneNumber if there then store its userID  or else create a new user first
        const { name, phoneNumber, address, products, promoCode } = req.body;

        if (!(name && phoneNumber && address)) {
            return res.status(400).json({ msg: "Enter proper and all data mentioned" });
        }
        if (products.length == 0) {
            return res.status(400).json({ msg: "Please provide the products that you want to add to cart" });
        }

        //check whether user exists or not
        let query = `SELECT * FROM hotnot_store.user WHERE (phoneNumber='${phoneNumber}')`

        let userID;


        db.query(query, (err, data) => {
            if (err) {
                // console.log(err.message);
                return res.status(400).json(err.message);
            }

            if (data.length == 0) {

                try {
                    //query to insert user in db
                    let addUser = `INSERT INTO hotnot_store.user (name, phoneNumber, address) VALUES ('${name}', '${phoneNumber}', '${address}');`

                    //running addUser query in db
                    db.query(addUser, function (err, data) {
                        if (err) {
                            //returning error
                            return res.status(400).json({ error: err })
                        }
                        userID = data.insertId
                    })

                } catch (error) {
                    //returning error
                    return res.status(400).json({ error: error })
                }
            }
            else {
                // console.log(data);
                userID = data[0].userID;
                // console.log(userID);
            }
        })

        await new Promise(resolve => setTimeout(resolve, 3000));

        // console.log('VeryOut: ', userID)

        // create cart and add products as string seperated by $ 
        let all_products_in_cart = [];
        let total_cost = 0;
        let total_sell = 0;
        let total_profit = 0;

        try {

            for (let i = 0; i < products.length; i++) {

                let temp_product = products[i];
                const { title, description, cost_prize, selling_prize, quantityToBuy, productID } = temp_product;
                const sp = selling_prize * quantityToBuy;
                const cp = cost_prize * quantityToBuy;
                const profit = sp - cp;

                total_cost += cp;
                total_sell += sp;
                total_profit += profit;

                let productJSON = {
                    productID: productID,
                    title: title,
                    description: description,
                    quantityToBuy: quantityToBuy,
                    cost_prize: cost_prize,
                    selling_prize: selling_prize,
                    total_sell: total_sell,
                    total_cost: total_cost,
                    profit: profit,
                    total_profit: total_profit
                }

                let get_product_quantity = `SELECT quantity FROM hotnot_store.product WHERE (productID='${productID}')`
                db.query(get_product_quantity, (err, qty_data) => {
                    if (err) return res.status(400).json(err.message);

                    // console.log(qty_data[0].quantity);
                    let qty = qty_data[0].quantity;

                    if (qty < quantityToBuy) {
                        return res.status(400).json({ msg: `We do not have the amount of quanatiy that you want to buy! we just have ${qty} amount!` })
                    }
                    else {

                        let new_qty = qty - quantityToBuy;

                        try {
                            let update_quantity = `UPDATE hotnot_store.product SET quantity='${new_qty}' WHERE (productID='${productID}')`

                            db.query(update_quantity, (err, data) => {
                                if (err) return res.status(400).json(err.message);
                            })
                        }
                        catch (error) {
                            return res.status(400).json(error.message);
                        }



                    }
                })

                let productString = JSON.stringify(productJSON);


                all_products_in_cart.push(productString);

            }

            // console.log(all_products_in_cart);

            let all_products_in_cart_string = all_products_in_cart.join("#");


            // availability of promo code
            let promo = 0;
            if (promoCode == 'Dhruv') {
                promo = total_sell / 3;
            }
            if (promoCode == 'Panchal') {
                promo = total_sell / 4;
            }
            if (promoCode == 'DhruvPanchal') {
                promo = total_sell / 2;
            }

            const currentDate = new Date();
            let dateTime = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`


            let add_to_cart = `INSERT INTO hotnot_store.cart (products, dateTime, profit, promoAmount, totalSelling, totalCost, userID ) VALUES ('${all_products_in_cart_string}','${dateTime}', '${total_profit}', '${promo}', '${total_sell}', '${total_cost}', '${userID}' )`

            db.query(add_to_cart, (err, data) => {
                if (err) return res.status(400).json(err.message);

                return res.status(200).json({ msg: "Added to cart successfully", promo: promo, total_sell: total_sell, userID: userID });
            })



        }
        catch (err) {
            return res.status(200).json(err.message);
        }
    }
    catch (err) {
        return res.status(400).json(err.message);
    }

}

// purchase a cart
exports.purchaseACart = (req, res) => {

    try {
        const cart_id = req.params.id;

        let query = `SELECT * FROM hotnot_store.cart WHERE (cartID='${cart_id}')`
        db.query(query, (err, data) => {
            if (err) return res.status(400).json(err.message);

            // console.log(data);
            if (data.length == 0) {
                return res.status(400).json({ msg: "There is No such cart present" });
            }

            const currentDate = new Date();
            let dateTime = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`

            // console.log(data);
            let cart = data[0];
            console.log(cart);

            let purchase_cart = `INSERT INTO hotnot_store.purchases (cartID, dateTime, userID, profit) VALUES ('${cart_id}', '${dateTime}', '${cart.userID}', '${cart.profit}')`

            db.query(purchase_cart, (err, data) => {
                if (err) return res.status(400).json(err.message);

                return res.status(200).json({ msg: "Purchased successfully" });
            })
        })
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
}

// generate a total profit for a day mentioned
exports.getProfitOnDay = async (req, res) => {

    const dateToGetProfit = req.body.date;

    let query = `SELECT * FROM hotnot_store.purchases WHERE (dateTime='${dateToGetProfit}')`
    db.query(query, (err, data) => {
        if (err) return res.status(400).json(err.message);

        // console.log(data);
        let dayProfit = 0;

        for (let i = 0; i < data.length; i++) {

            let profit_in_cart = data[i].profit;
            dayProfit += profit_in_cart;

        }
        return res.status(200).json({ profit: dayProfit });
    })



}


// generate bill of a cart mentioning everything
exports.generateBillForACart = async (req, res) => {

    const cart_id = req.params.id;

    //check whether that cartid is purchased or not
    let isPurchased = `SELECT * FROM hotnot_store.purchases WHERE (cartID='${cart_id}')`
    db.query(isPurchased, (err, data) => {
        if (err) return res.status(400).json(err.message);

        if (data.length == 0) {
            return res.status(400).json({ msg: "This cart is not purchased yet! First you have to buy the cart for making a bill" });
        }
    })


    try {

        let getCartDetails = `SELECT * FROM hotnot_store.cart WHERE (cartID='${cart_id}')`
        db.query(getCartDetails, (err, data) => {
            if (err) return res.status(400).json(err.message);


            const cart = data[0];
            const date = cart.dateTime;
            const promoAmount = cart.promoAmount;
            const billNumber = cart_id;
            const Amount = cart.totalSelling;
            const cart_products = cart.products;

            // convert products into JSON
            let products = [];
            const arr = cart_products.split("#");
            for (let i = 0; i < arr.length; i++) {
                const product = JSON.parse(arr[i]);
                products.push(product);
            }



            const userID = cart.userID;
            let user;
            let fetch_user = `SELECT * FROM hotnot_store.user WHERE (userID='${userID}')`
            db.query(fetch_user, (err, user_data) => {
                if (err) return res.status(400).json(err.message);

                // console.log(user_data);
                if (user_data.length == 0) {
                    return res.status(400).json({ msg: "No registered user exists for this cart" });
                }

                user = user_data[0];
                // console.log(user);

            })

            setTimeout(() => {

                const name = user.name;
                const phoneNumber = user.phoneNumber;
                const address = user.address;

                // generate pdf with the above data
                let htmlString = PDFtemplet({ date, promoAmount, billNumber, Amount, name, phoneNumber, address, products });

                let options = {
                    "height": "11.25in",
                    "width": "8.5in",
                    "header": {
                        "height": "20mm"
                    },
                    "footer": {
                        "height": "20mm",
                    },
                };

                pdf.create(htmlString, options).toFile('bill.pdf', (err, pdfDATA) => {
                    if (err) return res.status(400).json(err.message);

                    //return that pdf generated
                    return res.status(200).sendFile(`D:\\Projects\\Internshala\\HotNot\\StoreApis\\bill.pdf`)
                })
            }, 3000);

        })


    }
    catch (error) {
        return res.status(400).json(error.message);
    }
}



// add a product to the cart
exports.addAProductToCart = (req, res) => {

    console.log("optional");

}