import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { reviewSchema } from "../utils/schema.validation.js";
import ExpressError from "../utils/ExpressError.js";
import { isLoggedIn,isReviewAuthor } from "../middlewares/auth.middleware.js";
import { createReview,deleteReview } from "../controllers/review.controller.js";

const router=express.Router({mergeParams:true});

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    console.log(error)
    if(error){
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
}

router.post("/",isLoggedIn,validateReview,wrapAsync(createReview));

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(deleteReview))

export default router;