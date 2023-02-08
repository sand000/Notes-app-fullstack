const {Router} = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// require("dotenv").config();

const userController = Router();
const UserModel = require("../Models/user.model")

// signup
userController.post("/signup", async(req, res) =>{
   const {email, password, age} = req.body;

   bcrypt.hash(password, 5, async(err, hash) =>{
      if(err){
        res.send("somthing went wrong")
      }
      const user = await new UserModel({
        email, 
        password:hash,
        age
      })
      await user.save();
      res.send("Signup successfull")
   })
})


// login
userController.post("/login", async(req, res) =>{
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    const hash = user.password;

    bcrypt.compare(password, hash, (err, result) =>{
        if(err){
            console.log("err")
            res.send("Something went wrong");
        }
        if(result){
           const token = jwt.sign({userId: user._id}, "hello")
            res.send({"message":"successfull login", token})
        }else{
            res.send("Incorrect credentials")
        }
    })
})

module.exports= userController;