const express=require("express");
const router =express.Router();
const allowTo=require("../middleware/allowTo")
const controller =require("../controllers/user.controller")
const verify=require("../middleware/verficationToken")
const userRole=require("../utils/userstype")

router.route("/")
.get(verify,allowTo(userRole.Teacher),controller.getAllUsers)

router.route("/:id")
.get(verify,allowTo(userRole.Teacher),controller.getSingelUser)
.delete(controller.deleteUser)

router.route('/register')
.post(controller.Register);
router.route("/login")
.post(controller.Login);



module.exports=router;
