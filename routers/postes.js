const express=require("express")
const router=express.Router();
const userRole=require("../utils/userstype")
const allowTo=require("../middleware/allowTo")
const controllers=require("../controllers/post.contoller")
const verifyToken=require("../middleware/verficationToken")
router.route('/')
.get(verifyToken,allowTo(userRole.Student,userRole.Teacher,userRole.Parent),controllers.getposts)
.post(verifyToken,allowTo(userRole.Teacher,userRole.Student),controllers.addpost )
router.route('/:id')
.get(verifyToken,allowTo(userRole.Student,userRole.Teacher,userRole.Parent),controllers.getSingelPost)
.patch(verifyToken,allowTo(userRole.Student,userRole.Teacher),controllers.updatePost)
.delete(verifyToken,allowTo(userRole.Teacher),controllers.deletePost);

module.exports=router