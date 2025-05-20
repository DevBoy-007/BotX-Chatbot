const { Login }=require('../controller/login');
const express= require('express');
const router=express.Router();
router.post('/login',Login);
module.exports=router;