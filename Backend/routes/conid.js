const {makeid}=require('../controller/conid');
const Express=require("express");
const router=Express.Router();
router.post('/conid',makeid);
module.exports=router;