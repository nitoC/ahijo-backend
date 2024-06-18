"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const cloudinary_1 = require("cloudinary");
const parser_1 = __importDefault(require("datauri/parser"));
const dotenv = require("dotenv");
dotenv.config();
const cloudKey = process.env.CLOUD_KEY;
const cloudSecret = process.env.CLOUD_SECRET;
const cloudUser = process.env.CLOUD_USER;
// Configuration
cloudinary_1.v2.config({
    cloud_name: cloudUser,
    api_key: cloudKey,
    api_secret: cloudSecret,
});
// Upload an image
const uploadFile = (file, folder, id) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(file, "cloudinary file");
    try {
        const parser = new parser_1.default();
        let imageUri = parser.format(".jpg", file.buffer);
        // console.log(imageUri, "uri image");
        const buffer = parser.format(file.mimetype, file.buffer);
        console.log(buffer.content, "buffer");
        //@ts-ignore
        const uploadResponse = yield cloudinary_1.v2.uploader.upload(buffer.content, {
            folder: folder,
            public_id: id,
            // tags: ['express', 'typescript'],
        });
        console.log(uploadResponse.secure_url, "upload url");
        return uploadResponse.secure_url;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.uploadFile = uploadFile;
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
