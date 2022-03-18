const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

const {create} = require("../controllers/order")
const {update} = require("../controllers/order")
const {deleteUser} = require("../controllers/order")
const {userOrder} = require("../controllers/order")
const {getAllUser} = require("../controllers/order")
 
//CREATE

router.post("/", verifyToken, create);

//UPDATE
router.put("/:id", verifyTokenAndAdmin,update);

//DELETE
router.delete("/:id", verifyTokenAndAdmin,deleteUser);

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, userOrder);

//GET ALL

router.get("/", verifyTokenAndAdmin, getAllUser);


module.exports = router;