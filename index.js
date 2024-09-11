const express=require("express");
const { sequelize } = require("./models")
const app=express();
const postrouter=require("./routers/postes.js")
const userRouter=require("./routers/users.js")
require("dotenv").config();
app.use(express.json())

app.use('/posts',postrouter);
app.use('/users',userRouter);
app.listen(8000,()=>{
    console.log("listening .....on port  8000") 


// اختبار الاتصال بقاعدة البيانات
    sequelize.authenticate()
    .then(() => {
        console.log('Connected with educreative_db');
    })
    .catch(err => {
        console.error('Connetion failed', err);
    });

})