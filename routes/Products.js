const router = require('express').Router();
const db = require('../database');
const ProductsController = require('../controllers/ProductsController');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/addNewProduct', ProductsController.addNewProduct);
router.get('/getAllProducts', ProductsController.getAllProductsInStore);
router.get('/getAProductByQrHash', ProductsController.getAProductFromQRHash);
router.get('/getAProductByID/:id', ProductsController.getAProductFromID);
router.post('/addStockInStore/:id', ProductsController.addStockINStore);
router.delete('/deleteAProduct/:id', ProductsController.deleteProduct);
router.put('/updateAProduct/:id', ProductsController.updateProduct);


module.exports = router;

