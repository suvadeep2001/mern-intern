const express = require('express');

const {products} = require('../controllers/product')
const {update} = require('../controllers/product')
const {deleteUser} = require('../controllers/product')
const {getProduct} = require('../controllers/product')
const {getAllUser} = require('../controllers/product')

const router = express.Router();

const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../middleware/verifyToken');

// products

router.post("/",verifyTokenAndAdmin,products)

//UPDATE
router.put("/:id", verifyTokenAndAdmin,update);


//DELETE
router.delete("/:id", verifyTokenAndAdmin,deleteUser);
  
  //GET PRODUCT
router.get("/find/:id",getProduct);
  
  //GET ALL PRODUCTS
router.get("/",getAllUser);

module.exports = router;