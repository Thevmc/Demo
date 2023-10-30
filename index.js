const express=require("express")

const path=require("path")

const user=require("./models/user")

const app=express()

const getconnection=require("./connections")

const signuproute=require("./routes/user")

const loginroute=require("./routes/login")
 
const getvalidate=require("./middlewares/auth")

app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.set("views",path.resolve("./views"));

app.set("view engine","ejs")




app.use('/signup',signuproute)

app.use('/login',loginroute)

getconnection("mongodb://127.0.0.1:27017/database").then(()=>{console.log("mongo connected..")})

app.listen(3000,()=>{
    console.log("server started..")
})