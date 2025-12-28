import cloudinary from "cloudinary";
import CloudinaryStorage  from "multer-storage-cloudinary";
import "dotenv/config.js";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: process.env.FOLDER_NAME,
        allowerdFormats: ['png', 'jpeg', 'jpg']
    },
});

export{
    cloudinary,
    storage,
};
