const { fetchchat } = require("../controller/history");
const { deletechat } = require("../controller/history");
const {authmiddleware} = require("../middleware/authmiddleware");
const Express = require("express");
const router = Express.Router();
router.get("/histories", fetchchat);
router.delete("/deletechat/:id",authmiddleware,deletechat);
module.exports = router;
