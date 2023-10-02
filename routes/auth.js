const router = require("./router");


const authController = require("../controllers/auth");

router.route("/").get(authController.register)



module.exports=router;