const mongoose=require("mongoose")
function getconnection(url)
{
    return mongoose.connect(url)
}
module.exports=getconnection