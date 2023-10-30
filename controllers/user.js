const user=require("../models/user")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const secretcode="vmc$2101"
const {isValid,isvalidusername,validemail,validphone,validpass}=require("../validators/validate")
async function Signup(req,res)
{
 try
   {
    const data=req.body
    const err=[]

    if(Object.keys(data).length==0)
    {
        return res.status(400).send({error:false,mesaage:"all feilds are required "})
    }

    const { name, mail, password ,...rest}=data;
    if(Object.keys(rest).length > 0)
    {
        return res.status(400).json({error:`dont add ${Object.keys(rest)} in the inputs`});
    }

    const usercollections=["name","mail","password"];
    for(feild of usercollections)
    {
        if(!data.hasOwnProperty(feild))
        {
            return res.status(400).json({error:"all feilds are required.",message:`this ${feild} is required in request body..`});
        }
        if(feild === "name")
        {
          
            if(!isvalidusername(data[feild]))
            {
                err.push(`${feild} should only contain alphabets..`);
            }
        }
        if(feild === "mail")
        {
            if(!validemail(data[feild]))
            {
                err.push(`${feild} is not a valid mail.`);
            }
           
        }
        if(feild ==="password")
        {
            if(!validpass(data[feild]))
            {
                err.push(`${feild}  should contain alteast one lowercase one uppercase and password should be minimum 8 length`);
            }
        }
    }
    if(err.length > 0)
    {
        return res.status(400).json({status:false,message:err.join(", ")})
    }
    //hashpassword
    let checkmail=await user.findOne({mail:data.mail})
    if(checkmail)
    {
        return res.status(400).json({error:"already registerd with this mail."})
    }
    const hashpassword= await bcrypt.hash(password,10);
    data.password=hashpassword
    const results=user.create(data);
    return res.json({results:`user registered succesfully`});
    }

    catch(err)
    {
         return res.send({err:"err occured.."})
    }
}


async function Login(req,res)
{
    try
   {
    const data=req.body
    const err=[]

    if(Object.keys(data).length==0)
    {
        return res.status(400).send({error:false,mesaage:"all feilds are required from object function"})
    }

    const {mail,password,...rest}=data;
    if(Object.keys(rest).length > 0)
    {
        return res.status(400).json({error:`dont add ${Object.keys(rest)} in the inputs`});
    }

    const usercollections=["mail","password"];
    for(feild of usercollections)
    {
        if(!data.hasOwnProperty(feild))
        {
            return res.status(400).json({error:"all feilds are required. from loop.",message:`this ${feild} is required in request body..`});
        }
        if(feild === "mail")
        {
            if(!validemail(data[feild]))
            {
                err.push(`${feild} is not a valid mail.`);
            }
        }
        if(feild ==="password")
        {
            if(!validpass(data[feild]))
            {
                err.push(`${feild}  should contain alteast one lowercase one uppercase and password should be minimum 8 length`);
            }
        }
    }
    if(err.length > 0)
    {
        return res.status(400).json({status:false,message:err.join(", ")})
    }
    const log= await user.findOne({mail});
    if(log && (await bcrypt.compare(password,log.password)))
    {
        const accesstoken=jwt.sign({
            user:{
                username:user.name,
                mail:user.mail,
                id:user.id
                 }
        },secretcode)
        return res.json({Success:accesstoken});
     }
   }
   catch(err)
   {
    return res.send({error:"an error occured.."})
   }
    

}

async function getalldetails(req,res)
{
    const result=await user.find();
    if(!result)
    {
       return res.json({error:"no data found in database"})
    }
    return res.json({data:result})
}

async function getdetails(req,res)
{
    
    return res.json({msg:"this is user"})
}
module.exports={Signup,Login,getalldetails,getdetails,secretcode}