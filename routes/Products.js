const router = require('express').Router();
const db = require('../database');
const ProductsController = require('../controllers/ProductsController');
const bodyParser = require('body-parser');
const multer = require('multer');
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'files/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '.png') //Appending .jpg
//     }
//   })
  
// var upload = multer({ storage: storage });
const upload = multer({ dest: "files" });



router.use(bodyParser.json());

router.post('/addNewProduct', ProductsController.addNewProduct);
router.get('/getAllProducts', ProductsController.getAllProductsInStore);
router.get('/getAProductByQrCode', upload.single('qrcode'), ProductsController.getAProductFromQRCode);
router.get('/getAProductByID/:id', ProductsController.getAProductFromID);
router.post('/addStockInStore/:id', ProductsController.addStockINStore);
router.delete('/deleteAProduct/:id', ProductsController.deleteProduct);
router.put('/updateAProduct/:id', ProductsController.updateProduct);


module.exports = router;

