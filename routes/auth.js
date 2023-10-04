const router = require("./router");



//Validate Middleware
const {validateSchema} = require("../middlewares/validate");
//Validation Schemas
const authSchemas = require("../validations/auth");
//Controller
const authController = require("../controllers/auth");

router.route("/register").post(validateSchema(authSchemas.registerSchema),authController.register);
router.route("/login").post(validateSchema(authSchemas.loginSchema),authController.login);




module.exports=router;