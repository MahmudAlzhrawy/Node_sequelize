const Validator =require("fastest-validator");

const v=new Validator()

const validate =(data)=>{
    const schema ={
        title:{
            type:"string",optional:false,max:"100"
        },
        content:{  type:"string",optional:false,max:"500"},
        categoryId:{  type:"number",optional:false},
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