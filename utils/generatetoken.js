const JWT=require('jsonwebtoken');
const generateToken=async(payload)=>{
    const token= await JWT.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:'5m'});
    return token;   
}
module.exports=generateToken;