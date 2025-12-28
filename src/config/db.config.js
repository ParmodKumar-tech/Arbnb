import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "dotenv/config.js";

const dbUrl=process.env.ATLASDB_URL;

export const connectDB=async ()=>{
    try{
        const connect=await mongoose.connect(dbUrl);
        console.log("Connect DB");
    }
    catch(error){
        console.log("Failed to connect DB",error.message);
    }
}

export const mongoStore=()=>{
const store=MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret:process.env.SECRET,
    },
    touchAfter: 24*3600
})
store.on("error",(err)=>{
    console.log("Error in MongoSession side: ",err);
})
}

