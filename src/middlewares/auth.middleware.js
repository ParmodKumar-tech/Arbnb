import { Listing } from "../models/listing.model.js";
import { Review } from "../models/review.model.js";
import { listingSchema } from "../utils/schema.validation.js";
import ExpressError from "../utils/ExpressError.js";


export const isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){ 
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged In");
        return res.redirect(`/login`);
    }
    next();
}

export const saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

export const isPostOwner=async (req,res,next)=>{
    let {id}=req.params;
    let listing =await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentUser.id)){
        req.flash("error","you don't have permission to update or Delete");
        return res.redirect(`/lists/${id}`);
    }
    next();
}

export const isReviewAuthor=async (req,res,next)=>{
    let {id,reviewId}=req.params;
    let review =await Review.findById(reviewId);
   
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error","you are not author of this review !!");
        return res.redirect(`/lists/${id}`);
    }
    
    next();
}

export const isValidateListing =(req,res,next)=>{
    
    let {error}=listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }
    else{ 
        next();
    }

}

