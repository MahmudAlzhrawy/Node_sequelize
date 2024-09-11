const Validator =require("fastest-validator");
const userRole=require("../utils/userstype");
const v=new Validator()

const validate =(data)=>{
    const schema ={
        name:{
            type:"string",optional:false,min:"3"
        },
        email:{ type:"email",optional:false},
        password:{  type:"string",optional:false},
        role:{  type:"string",optional:false,enum:[userRole.Teacher,userRole.Parent,userRole.Student] },
    }
const validationResult =v.validate(data,schema);
if(validationResult !==true){
    return {
        success:false,
        erorrs:validationResult
    };
}

return{
    success:true
}
}
module.exports=validate;