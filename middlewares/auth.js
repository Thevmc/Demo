const jwt=require("jsonwebtoken")
const {secretcode}=require("../controllers/user")
async function getvalidate(req,res,next)
    {
        let token;
        let autheader=req.header.Authorization || req.header.authorization;
        if(autheader && autheader.startsWith("Bearer"))
        {
            token=autheader.split(" ")[1];
            jwt.verify(token,secretcode,(err,decoded)=>
            {
                if(err)
                {
                    throw new Error("User is not authorized");
                }
                req.user=decoded.user;
                next()
            })
        }
    }

module.exports=getvalidate;