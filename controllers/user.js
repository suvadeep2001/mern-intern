const Crypto = require("crypto-js")

const jwt = require('jsonwebtoken')


const User = require('../models/Users')


exports.register = () => async(req,res) => {


    const {username,email,password} = req.body;


    let newUser = await User.findOne({email});

    if(newUser)
    {
       return res.status(404).json({message:"You have Already registered.Please Login"});
    }

    if (!(username && email && password)) {
       return res.status(501).send("All fields are required");
    }

      newUser = new User({
        username,
        email,
        password: Crypto.AES.encrypt(password,process.env.MY_SECRET)
    });
    
    try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    } catch (error) {
    res.status(501).json(error);
    }
}


exports.login = () => async(req,res)=>{

    try {
        const user = await User.findOne({email:req.body.email})

        !user && res.status(404).json({message:"Wrong Credentials"})

        const hashedPassword = Crypto.AES.decrypt(
            user.password,
            process.env.MY_SECRET
        )
        const Originalpassword = hashedPassword.toString(Crypto.enc.Utf8)
        Originalpassword !== req.body.password &&
        res.status(401).json({ message:"Email or password Incorrect"}) 

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin
        },
        process.env.SECRET_KEY,
        { 
            expiresIn:"2h"
        }
        )
        
        const {password,...others} = user._doc
        
        
        return res.status(200).json({...others,accessToken})
    } catch (error) {
        
    }
}

exports.updateUser = () => async(req, res) => {
  
    if(req.body.password){
        req.body.password =  
        Crypto.AES.encrypt(req.body.password,process.env.MY_SECRET).toString();
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        res.status(200).json(updateUser);
    } catch (error) {
        return res.status(500).json(error)
    }


}

exports.deleteUser = () => async(req,res)=>{
    try {
        
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"User has been deleted successfully"})

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getUser = () => async(req,res)=>{
    try {
        
       const user = await User.findById(req.params.id)
       const {password,...others} = user._doc
        
        
        return res.status(200).json(others)

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAllUser = () => async(req,res)=>{
    try {
        
       const users = await User.find()        
        
        return res.status(200).json(users)

    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getUserStats = () => async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        
        const data = await User.aggregate([
            {$match:{createdAt:{$gte:lastYear} }},
            {
                $project:{
                    month: {$month:"$createdAt"}
                }
            },
            {
                $group:{
                    _id: "$month",
                    total:{$sum: 1}
                }
            }
        ])
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error)
    }
}