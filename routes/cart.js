const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

const {create} = require("../controllers/cart")
const {update} = require("../controllers/cart")
const {deleteUser} = require("../controllers/cart")
const {getUserCart} = require("../controllers/cart")
const {getAllUser} = require("../controllers/cart")

//CREATE

router.post("/", verifyToken,create);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization,update);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization,getUserCart);

//GET ALL

router.get("/", verifyTokenAndAdmin,getAllUser);

module.exports = router;