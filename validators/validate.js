function isValid(value)
{
    if(value !== "string"|| value.trim.length()==0)
    {
        return false;
    }
    else
    {
        return true;
    }
}
function isvalidusername(value)
{
    let userRegex=/^[a-zA-Z]+$/;            // let userRegex = /^[a-zA-Z]+$/;
    return userRegex.test(value);
}
function validemail(value)
{
    let useremail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return useremail.test(value);
}

function validphone(value)
{
    let phnRegex=/^([0-9]{10})*$/;
    return phnRegex.test(value);
}
function validpass(value)
{
    let pasregrex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,15}$/ ;
    return pasregrex.test(value)
}
module.exports={isValid,isvalidusername,validemail,validphone,validpass}