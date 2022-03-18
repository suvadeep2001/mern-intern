const express = require('express');
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../middleware/verifyToken');


const router = express.Router();

const {register} = require('../controllers/user')
const {login} = require('../controllers/user')
const {updateUser} = require('../controllers/user')
const {deleteUser} = require('../controllers/user')
const {getAllUser} = require('../controllers/user')
const {getUser} = require('../controllers/user')
const {getUserStats} = require('../controllers/user')

// register user routes

router.post("/register",register)

// login user routes

router.post("/login",login)

// update profile

router.put("/:id",verifyTokenAndAuthorization,updateUser)

// delete user

router.delete("/:id",verifyTokenAndAuthorization,deleteUser)

// get user

router.get("/find/:id",verifyTokenAndAdmin,getUser)

// get all users

router.get("/",verifyTokenAndAdmin,getAllUser)


// get us stats

router.get("/stats",verifyTokenAndAdmin,getUserStats)

module.exports = router;