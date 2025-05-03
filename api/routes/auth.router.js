const express=require("express");
const router=express.Router();  
const { register,login,logout,profile,updateProfile } = require("../controllers/auth.controller");
const authMiddleware  = require("../middlewares/auth.middleware");
const validatorMiddleware = require("../middlewares/validator.middleware");
const { loginSchema } = require("../validators/auth.validator");
const { registerSchema } = require("../validators/auth.validator");

router.post("/register",validatorMiddleware(registerSchema),register);

router.post("/login",validatorMiddleware(loginSchema),login);

router.post("/logout",authMiddleware,logout);

router.get("/profile",authMiddleware,profile);

router.put("/profile",authMiddleware,updateProfile);


module.exports = router;
