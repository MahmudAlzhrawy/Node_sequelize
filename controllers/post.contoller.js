const { where } = require('sequelize');
const validate =require("../utils/validatpost")
const {Post, User}=require('../models');
const getposts =async(req,res)=>{
    const postes= await Post.findAll();
res.status(200).json({msg:"sucess" ,data:postes});
}
const getSingelPost=async(req,res)=>{
    const id =+ req.params.id;
    try{
        const post= await Post.findByPk(id,{
            include:User
        })
        if(post){
            return  res.status(200).json({status:"Success",data:{Post:post}})
        }
        return  res.status(404).json({status:"Faild",msg:"Not Found",data:{Post:Null}})

    }catch(err){
        res.status(500).json({status:"Error",msg:err})
    }

    
    
}
const addpost =async(req,res)=>{
    const {title,content,imgUrl,categoryId}=req.body;
    const post={
        title,
        content,
        imgUrl,
        categoryId,
        userId:req.user.userId
    }
    
    const validationResult=validate(post);
    if (!validationResult.success) {
        return res.status(400).json({ status: validationResult.success, errors: validationResult.erorrs });
        }
    

        try {
            const newPost = await Post.create(post);
            res.status(201).json({ status: "Success", post: newPost });
        } catch (err) {
            res.status(500).json({ status: "Error", error: err.message });
        }
        };

const updatePost=async(req,res)=>{
    const {title,content,imgUrl,categoryId}=req.body;
    const id=+req.params.id
    const updatedPost={
        title,
        content,
        imgUrl,
        categoryId,
    }
    userId:req.user.userId
    
    const validationResult=validate( updatedPost);
    if (!validationResult.success) {
        return res.status(400).json({ status: validationResult.success, errors: validationResult.erorrs });
        }
        try{

            await Post.update(updatedPost,{where:{id:id}})
                res.status(200).json({status:"Success",data:{post:updatedPost}});
            
        }catch(err){
            res.status(500).json({ status: "Error", error: err.message });
        }
    
}
const deletePost=async(req,res)=>{
    
    const id=+req.params.id;
    try{
    await Post.destroy({where:{id:id}})
        res.status(200).json({status:"Success delete",data:{post:Post}});
    }catch(err){
        res.status(404).json({status:"Error",err:"this one not exist"})
    };
    
}
    module.exports={
        getposts,
        addpost,
        getSingelPost,
        updatePost,
        deletePost
    }