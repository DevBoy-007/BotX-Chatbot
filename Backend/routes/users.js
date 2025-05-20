const { Submit } = require("../controller/user");
const { authmiddleware } = require("../middleware/authmiddleware");
const Express = require("express");
const router = Express.Router();
router.post("/Submitting",authmiddleware,Submit);
module.exports = router;
