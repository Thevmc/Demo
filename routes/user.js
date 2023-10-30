const express=require("express");

const router=express.Router();

const {Signup,Login}=require("../controllers/user")

router.route("/").post(Signup)


module.exports=router