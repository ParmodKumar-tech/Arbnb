import mongoose from "mongoose";
import { Review } from "./review.model.js";


const listingSchema=new mongoose.Schema({
    title:
    {
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    
    image:{
        url: String,
        filename:String,     
    },

    price:{
        type:Number,
        required:true
    },

    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        require:true    
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Review",
        }
    ],

    owner: 
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        }
})


listingSchema.post("findOneAndDelete" , async(lists)=>{
    if(lists){
        await Review.deleteMany({_id: {$in: lists.reviews}});
    }
});


export const Listing=mongoose.model("Listing",listingSchema);



