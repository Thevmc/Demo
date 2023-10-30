const express=require("express");

const logrouter=express.Router();

const {Login,getdetails,getalldetails}=require("../controllers/user")

logrouter.route("/").post(Login)
logrouter.route("/user").get(getdetails)
logrouter.route("/users").get(getalldetails)

module.exports=logrouter