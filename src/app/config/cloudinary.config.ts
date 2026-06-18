import { v2 as cloudinary } from "cloudinary";
// import stream from "stream";
// import AppError from "../errorHelpers/AppError";
import { envVars } from "./env";



cloudinary.config({
    cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
    api_key: envVars.CLOUDINARY_API_KEY,
    api_secret: envVars.CLOUDINARY_API_SECRET
})



export const cloudinaryUpload = cloudinary



// const uploadToCloudinary = cloudinary.uploader.upload()

//

//Multer storage cloudinary
//Amader folder -> image -> form data -> File -> Multer -> storage in cloudinary -> url ->  req.file  -> url  -> mongoose -> mongodb