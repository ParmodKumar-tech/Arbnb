import { User } from "../models/user.model.js";

export const signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser= new User({email,username});

        let registerUser=await User.register(newUser,password);
        req.login(registerUser,(error)=>{
            if(error){
                return next(error);
            }
            req.flash("success","Registered Successfully !");
            res.redirect("/lists"); 
        })
       
    }
    
    catch(error){
            req.flash("error",error.message);
            res.redirect("/signup");
    }
}

export const login=async(req,res)=>{
       
    req.flash("success","Successfully login !");
    let redirectUrl = res.locals.redirectUrl || "/lists";
    res.redirect(redirectUrl);
  
}

export const logout=(req,res)=>{
    req.logout((error)=>{
        if(error){
            return next(error);
        }
        req.flash("success","you are logged out !");
        res.redirect("/lists");
    })
}

export const renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}