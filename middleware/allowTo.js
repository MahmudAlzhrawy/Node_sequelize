module.exports =(...roles)=>{
return async (req,res,next)=>{
if(roles.includes(req.user.role)){
    next()
    }
    else{
    res.status(403).json({message:"You are not allowed to access this route"})
    }

}
}