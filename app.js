import path from "path";
import express from "express";
import { dirname } from "path";
import ejsMate from "ejs-mate";
import passport from "passport";
import flash from "connect-flash";
import { fileURLToPath } from "url";
import session from "express-session";
import cookieParser from "cookie-parser";
import LocalStrategy from "passport-local";
import methodOverride from "method-override";
import { User } from "./src/models/user.model.js";
import userRouter from "./src/routes/user.route.js";
import ExpressError from "./src/utils/ExpressError.js";
import listingRouter from "./src/routes/list.route.js";
import reviewRouter from "./src/routes/review.route.js";
import { connectDB,mongoStore } from "./src/config/db.config.js";
import "dotenv/config.js";

const app=express();
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);

app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.set("views",path.join(__dirname,"src","views"))
app.use(express.urlencoded({extended:true}));
app.use(cookieParser("secretCode")); 

connectDB();

const sessionOption={
    store:mongoStore(),
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,

    cookie:{
        expires: Date.now() + 7*24*60*60*1000, 
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}


app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success"); 
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user; 
    next();
})

app.use("/lists",listingRouter);
app.use("/lists/:id/reviews",reviewRouter);
app.use("/",userRouter);


app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});


app.listen("8080",(req,res)=>{
    console.log("server is ready to listen on port 8080 ...");
})
