const JWT =require('jsonwebtoken');
const verficationToken =async(req,res,next)=>{
    const autheader =req.headers['authorization']
    if(!autheader){
        return res.status(403).json({message:'No token provided'})
    }
    const token = autheader.split(' ')[1];
    try{
    const decodedToken=await  JWT.verify(token,process.env.JWT_SECRET_KEY);
    req.user = decodedToken;
    console.log(decodedToken);
    next();
    }catch(err){
        return res.status(403).json({message:'Invalid token'})
    }
    
}

module.exports = verficationToken;