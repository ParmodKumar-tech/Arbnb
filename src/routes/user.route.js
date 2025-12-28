import express from "express";
import passport from "passport";
import { saveRedirectUrl } from "../middlewares/auth.middleware.js";
import { signup,logout,login,renderSignupForm } from "../controllers/user.controller.js";
import wrapAsync from "../utils/wrapAsync.js";

const router=express.Router({mergeParams:true});

router
    .route("/signup")
    .get(renderSignupForm)
    .post(wrapAsync(signup));


router
    .route("/login")
    .get((req,res)=>{res.render("users/login.ejs") })
    .post(saveRedirectUrl,passport.authenticate("local",
        {failureRedirect:"/login",
        failureFlash:true}),
        login);    

router.get("/logout",logout);


export default router;

