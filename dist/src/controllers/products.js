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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductItem = exports.getAllProductItemBySex = exports.getAllProductItemByCategory = exports.getProductItem = exports.addProductItem = void 0;
// import { File } from "multer";
const Product_js_1 = require("../repositories/Product.js");
// import product from "../models/Product.js";
const cloudinary_js_1 = require("../config/cloudinary.js");
// // Define the type for the uploaded files
// interface MulterFile {
//   path: string;
//   fieldname: string;
//   originalname: string;
//   encoding: string;
//   mimetype: string;
//   size: number;
//   destination: string;
//   filename: string;
//   buffer?: Buffer;
// }
// // Extend the Request type to include Multer's files property
// interface CustomRequest extends Request {
//   files: { [fieldname: string]: File[] } | File[] | undefined;
// }
const addProductItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, category, stock } = req.body;
        const files = req.files;
        let filesArray = [];
        for (let file in files) {
            filesArray.push([files[file], file]);
        }
        let data = {
            name,
            description,
            price,
            category,
            stock,
            image: "",
            top_image: "",
            right_image: "",
            left_image: "",
        };
        // console.log(filesArray, "files");
        // console.log(typeof files, "files");
        const productItem = filesArray === null || filesArray === void 0 ? void 0 : filesArray.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("uploading");
            const secure_url = yield (0, cloudinary_js_1.uploadFile)(file[0][0], 
            //@ts-ignore
            name, file[1]);
            console.log(secure_url, "secure url");
            const index = file[1];
            console.log(index, "index");
            console.log(file, "index");
            data[index] = secure_url;
            console.log("upload finished");
        }));
        yield Promise.all(productItem);
        const item = yield (0, Product_js_1.addProduct)(data);
        console.log(item, "files");
        console.log(typeof item, "files");
        return res.json({ message: "success", status: 201, data: null });
    }
    catch (error) {
        console.log(error, "add product error");
        res.json({ message: "oops! an error occured", status: 500 });
    }
});
exports.addProductItem = addProductItem;
const getProductItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { item_id } = req.params;
        const item = yield (0, Product_js_1.getProduct)({ item_id });
        return res.json({ message: "success", status: 200, data: item });
    }
    catch (error) {
        console.log(error, "get product error");
        res.json({ message: "Oops! an error occured", status: 500 });
    }
});
exports.getProductItem = getProductItem;
const getAllProductItemByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const factor = 18;
    try {
        const { category, offset, limit } = req.query;
        let offsetVal = parseInt(offset);
        let limitVal = parseInt(limit);
        let categoryVal = category;
        const item = yield (0, Product_js_1.getAllProductByCategory)({
            category: categoryVal,
            offsetVal,
            limitVal,
        });
        return res.json({ message: "success", status: 200, data: item });
    }
    catch (error) {
        console.log(error, "get product error");
    }
});
exports.getAllProductItemByCategory = getAllProductItemByCategory;
const getAllProductItemBySex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const factor = 18;
    try {
        const { sex, offset, limit } = req.params;
        let offsetVal = parseInt(offset);
        let limitVal = parseInt(limit);
        const item = yield (0, Product_js_1.getAllProductBySex)({ sex, offsetVal, limitVal });
        return res.json({ message: "success", status: 200, data: item });
    }
    catch (error) {
        console.log(error, "get product error");
    }
});
exports.getAllProductItemBySex = getAllProductItemBySex;
const deleteProductItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { item_id } = req.params;
        const item = yield (0, Product_js_1.deleteProduct)(item_id);
        return res.json({ message: "success", status: 204 });
    }
    catch (error) {
        console.log(error, "delete product error");
        res.json({ message: "oops! an error occurred", status: 500 });
    }
});
exports.deleteProductItem = deleteProductItem;
