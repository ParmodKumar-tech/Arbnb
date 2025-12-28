import express from "express";
import multer from "multer";
import wrapAsync from "../utils/wrapAsync.js";
import { storage } from "../config/cloud.config.js";
import { isLoggedIn,isPostOwner } from "../middlewares/auth.middleware.js";
import { createList,
    renderNewForm,
    showLists,
    showListDetails,
    updateList,
    deleteList,
    isSearch,
    getSearchedListing,
    renderUpdateForm} 
    from "../controllers/list.controller.js";

const upload = multer({storage});
const router=express.Router({mergeParams:true});

router
    .route("/")
    .get(wrapAsync(showLists))
    .post(isLoggedIn,upload.single('image'),wrapAsync(createList))

router
    .get("/newlist",isLoggedIn,renderNewForm)
    
router
    .route("/:id")
    .get(wrapAsync(showListDetails))
    .put(isLoggedIn,upload.single('image'),wrapAsync(updateList))
    .delete(isLoggedIn,isPostOwner,wrapAsync(deleteList));

router
    .route("/:id/update")
    .get(isLoggedIn, isPostOwner,wrapAsync(renderUpdateForm))


router
    .route("/search")
    .post(isSearch)

router 
    .route("/search/:query")
    .get(getSearchedListing)
    
export default router;