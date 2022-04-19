const router = require('express').Router();
const bodyParser = require('body-parser');
const CartController = require('../controllers/CartController');


router.use(bodyParser.json());

// make cart for a user and add cartID into users schema
router.post('/makeCart', CartController.makeACartForUser);
//fetch a cart
router.get('/getACart/:id', CartController.fetchACart)
// add a product to the cart
router.put('/addProductsToCart/:id', CartController.addAProductToCart);
// purchase a cart
router.post('/purchaseACart/:id', CartController.purchaseACart);
// generate a total profit for a day mentioned
router.get('/getProfitForADay', CartController.getProfitOnDay);
// generate bill of a cart mentioning everything
router.get('/getBillForACart/:id', CartController.generateBillForACart);


module.exports = router