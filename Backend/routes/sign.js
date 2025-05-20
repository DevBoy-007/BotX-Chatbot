const { Signup }=require('../controller/sign');
const express= require('express');
const router=express.Router();
router.post('/signup',Signup);
module.exports=router;