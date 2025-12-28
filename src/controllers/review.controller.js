import { Listing } from "../models/listing.model.js";
import { Review } from "../models/review.model.js";

export const createReview=async(req,res)=>{
    
    let {id}=req.params;
    const comment=req.body.review.comment;


    if( comment.length<=0 || !comment.trim()){
        req.flash("error","Review cannot be empty.");
        return res.redirect(`/lists/${id}`);
    }
    
    const listing=await Listing.findById(id);
    const newReview= new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success","Review is added !");
    res.redirect(`/lists/${id}`);
    
}

export const deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted Successfully !");
    res.redirect(`/lists/${id}`);
}