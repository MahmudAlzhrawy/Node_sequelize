const {User,Post} =require("../models");
const bcrypt =require("bcryptjs");
const validate =require("../utils/validateuser");
const generateToken=require("../utils/generatetoken");


const getAllUsers =async(req,res)=>{
    try{
    const users=await User.findAll()
        res.status(200).json({status:"Success",data:{Users:users}})
    }catch(err){
        res.status(400).json({status:"Faild",data:{Users:null}})
    }
}
const getSingelUser=async(req,res)=>{
    const id =+ req.params.id;
    try{
        const user= await User.findByPk(id)
        if(user){
            return  res.status(200).json({status:"Success",data:{Post:user}})
        }
        return  res.status(404).json({status:"Faild",msg:"Not Found",data:{Post:Null}})

    }catch(err){
        res.status(500).json({status:"Error",msg:err})
    }

    
    
}
const Register=async(req,res)=>{
    const {name ,imgUrl,email,password,role,major,studyingYear,matrial,schoolName}=req.body;
    const checkemail =await User.findOne({where:{Email:email}})
    if(checkemail){
        return res.status(409).json({status:"Faild", meg:"Email already exists "})
    }
    
    if(!password ||password.length <6  ){
        return res.status(409).json({status:"Faild", meg:"Password is required Or Password is less than 6 characters"})
    }
    const newUser = {
        name,
        imgUrl,
        email,
        password,  // استخدم كلمة المرور العادية للتحقق من صحة الإدخال
        role,
        major,
        studyingYear,
        matrial,
        schoolName
    };

    const validationResult = validate(newUser);
    if (!validationResult.success) {
        return res.status(400).json({ status:validationResult.success, error: validationResult.erorrs });
    }

    try {
        const hashpassword = await bcrypt.hash(password, 10);
        newUser.password = hashpassword;  // تحديث كلمة المرور المشفرة

        const user = await User.create(newUser);
        res.status(201).json({ status: "Successfully Created", Users: { User: user } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Failed", msg: "Something went wrong" });
    }



}
const Login = async(req,res)=>{
    const{email,password}=req.body;
    const findUser= await User.findOne({where:{Email:email}});
    if(findUser){
        const comparepass=await bcrypt.compare(password,findUser.password);
        if(comparepass){
            const token =await generateToken({userId:findUser.id,role:findUser.role,Name:findUser.name,Email:findUser.email});
            res.status(200).json({status:"Success",data:findUser,token:token});
        }
        else{
            res.status(400).json({status:"Faild",msg:"Password not Correct"});
        }
    }
    else{
        res.status(400).json({status:"Faild",msg:"This email is not exists"});
    }
    
}
const deleteUser = async (req, res) => {
    try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({ status: "Failed", msg: "User not found" });
    }
    await user.destroy();
 }catch(err){
    res.status(500).json({ status: "Failed", msg: "Something went wrong" });
 }
}

module.exports={
    Register,
    Login,
    getAllUsers,
    getSingelUser,
    deleteUser
}