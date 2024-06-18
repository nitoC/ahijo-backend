import { v2 as cloudinary } from "cloudinary";
import datauir from "datauri";
import DataURIParser from "datauri/parser";
const dotenv = require("dotenv");
dotenv.config();

const cloudKey = process.env.CLOUD_KEY;
const cloudSecret = process.env.CLOUD_SECRET;
const cloudUser = process.env.CLOUD_USER;

// Configuration
cloudinary.config({
  cloud_name: cloudUser,
  api_key: cloudKey,
  api_secret: cloudSecret,
});

// Upload an image
export const uploadFile = async (file: any, folder: string, id: string) => {
  //console.log(file, "cloudinary file");
  try {
    const parser = new DataURIParser();
    let imageUri = parser.format(".jpg", file.buffer);
    // console.log(imageUri, "uri image");
    const buffer = parser.format(file.mimetype, file.buffer);
    console.log(buffer.content, "buffer");
    //@ts-ignore
    const uploadResponse = await cloudinary.uploader.upload(buffer.content, {
      folder: folder,
      public_id: id,
      // tags: ['express', 'typescript'],
    });
    console.log(uploadResponse.secure_url, "upload url");
    return uploadResponse.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// // Optimize delivery by resizing and applying auto-format and auto-quality
// const optimizeUrl = cloudinary.url("shoes", {
//   fetch_format: "auto",
//   quality: "auto",
// });

// console.log(optimizeUrl);

// //Transform the image: auto-crop to square aspect_ratio
// const autoCropUrl = cloudinary.url("shoes", {
//   crop: "auto",
//   gravity: "auto",
//   width: 500,
//   height: 500,
// });

// console.log(autoCropUrl);
