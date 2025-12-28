import { Listing } from "../models/listing.model.js";

export const showLists=async (req,res)=>{   
    let allData= await Listing.find();
    res.render("show_data.ejs",{allData});
}

export const renderNewForm=(req,res)=>{
    res.render("show_form.ejs");
}

export const showListDetails=async (req,res)=>{
    let {id}=req.params;
    let targetData= await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    
    if(!targetData){

        req.flash("error","Listing does not exist !");
        res.redirect("/lists");
        
    }else{

        res.render("item_details.ejs",{targetData});

    }
}


export const createList = async (req, res) => {
        const cloudUrl=req.file.secure_url;
        const cloudFilename=req.file.originalname;
        const newListing=new Listing({...req.body,owner:req.user._id});

        newListing.image={url:cloudUrl,filename:cloudFilename};
        await newListing.save();

        req.flash("success", "New Listing has been created!");
        res.redirect("/lists");
   
    }


export const renderUpdateForm=async(req,res)=>{
    
    const {id}=req.params;
    const currentUserData= await Listing.findById(id);
    if(!currentUserData){
        req.flash("error","Listing does not exist !");
        res.redirect("/lists");
    }

    const originalImageUrl=currentUserData.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_200,w_250");
    res.render("update_form.ejs",{currentUserData,originalImageUrl});
}

export const updateList=async(req,res)=>{
   
    let {id}=req.params;
    let updateListing=await Listing.findByIdAndUpdate(id,{...req.body});
    
    if(typeof req.file !="undefined"){
        const cloudUrl=req.file.secure_url;
        const cloudFilename=req.file.originalname;
        updateListing.image={url:cloudUrl,filename:cloudFilename};
        await updateListing.save();
    }
   

    req.flash("success","Updation is successfull !");
    res.redirect(`/lists/${id}`);
}

export const deleteList=async (req,res)=>{
    const {id}=req.params;
    const deletedList=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing is Deleted !");
    res.redirect("/lists");
}
    
export const isSearch=async(req,res)=>{
    const {searchData}=req.body;
    const regex= new RegExp(searchData, "i");
    const listings= await Listing.find({title:regex},{ _id: 1, title: 1 }).limit(7);
    const items=listings.map(listing=>({id:listing._id,title:listing.title}));
    return res.json({ success: true, items }); 

}

export const getSearchedListing=async(req,res)=>{
    const { query } = req.params;
    const searchListing= await Listing.find({title:query});
    if(searchListing.length === 0){
        req.flash("error","No such listing exists");
        return res.redirect("/lists");
    }
    res.render("show_data.ejs", {
        allData:searchListing,
    });
}