const{fetchmsg}=require('../controller/message');
const Express=require('express');
const router=Express.Router();
router.get('/messages/:id',fetchmsg);
module.exports=router;