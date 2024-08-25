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
exports.deleteProductItem = exports.getAllProductItemBySex = exports.getAllProductItemByTag = exports.getAllProductItemByName = exports.getAllProductItemByCategory = exports.getProductItem = exports.addProductItem = void 0;
const zod_1 = require("zod");
// import { File } from "multer";
const Product_js_1 = require("../repositories/Product.js");
// import product from "../models/Product.js";
const cloudinary_js_1 = require("../config/cloudinary.js");
const customErrors_js_1 = require("../errors/customErrors.js");
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
const addProductItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productValidate = zod_1.z.object({
            name: zod_1.z.string().min(2),
            description: zod_1.z.string().min(2),
            price: zod_1.z.number().positive(),
            category: zod_1.z.string().min(2),
            sex: zod_1.z.string().nullable(),
            stock: zod_1.z.number().positive(),
            sizes: zod_1.z.string(),
            tags: zod_1.z.string().nullable().optional(),
        });
        const { name, description, price, category, stock, sex, sizes, tags } = req.body;
        const files = req.files;
        const productValid = productValidate.safeParse({
            name,
            description,
            price: parseInt(price),
            category,
            sex,
            stock: parseInt(stock),
            sizes,
            tags,
        });
        if (!productValid.success) {
            throw new customErrors_js_1.BadRequestError("Invalid request. you submitted an empty or invalid field");
        }
        const filesArray = Object.entries(files).map(([fieldname, file]) => ({
            file: file[0],
            fieldname,
        }));
        let data = {
            name,
            description,
            price: parseInt(price),
            category,
            stock: parseInt(stock),
            sex,
            tags: tags.split(","),
            sizes: sizes.split(","),
            image: "",
            top_image: "",
            right_image: "",
            left_image: "",
        };
        const productItemPromises = filesArray.map((_a) => __awaiter(void 0, [_a], void 0, function* ({ file, fieldname }) {
            try {
                const secure_url = yield (0, cloudinary_js_1.uploadFile)(file, name, fieldname);
                data[fieldname] = secure_url;
            }
            catch (error) {
                console.log(`Failed to upload ${fieldname}`, error);
                throw new Error("Oops! failed to upload file to storage");
            }
        }));
        yield Promise.all(productItemPromises);
        const item = yield (0, Product_js_1.addProduct)(data);
        console.log(item, "Product added");
        return res
            .status(201)
            .json({ message: "Success", status: 201, data: item });
    }
    catch (err) {
        console.log("Add product error:", err);
        next(err);
    }
});
exports.addProductItem = addProductItem;
const getProductItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodSchema = zod_1.z.string();
        const { item_id } = req.params;
        console.log(item_id, "item id");
        console.log(req.params, "params");
        const itemValid = zodSchema.safeParse(item_id);
        if (!itemValid.success)
            throw new customErrors_js_1.BadRequestError("Invalid item id");
        const item = yield (0, Product_js_1.getProduct)({ item_id });
        return res.json({ message: "success", status: 200, data: item });
    }
    catch (err) {
        console.log(err, "get product error");
        next(err);
    }
});
exports.getProductItem = getProductItem;
const getAllProductItemByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
const getAllProductItemByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const factor = 18;
    try {
        const { name, offset, limit } = req.query;
        console.log(req.query, "query log");
        console.log(name, "get product by name");
        let offsetVal = parseInt(offset);
        let limitVal = parseInt(limit);
        let nameVal = name;
        console.log(name, "name");
        const item = yield (0, Product_js_1.getAllProductByName)({
            name: nameVal,
            offsetVal,
            limitVal,
        });
        return res.json({ message: "success", status: 200, data: item });
    }
    catch (error) {
        console.log(error, "get product error");
    }
});
exports.getAllProductItemByName = getAllProductItemByName;
const getAllProductItemByTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const factor = 18;
    try {
        const { tag, offset, limit } = req.query;
        let offsetVal = parseInt(offset);
        let limitVal = parseInt(limit);
        let tagVal = tag;
        const item = yield (0, Product_js_1.getAllProductByTag)({
            tag: tagVal,
            offsetVal,
            limitVal,
        });
        return res
            .status(200)
            .json({ message: "success", status: 200, data: item });
    }
    catch (error) {
        console.log(error, "get product error");
        res.status(500).json({ message: "couldn't fetch products" });
    }
});
exports.getAllProductItemByTag = getAllProductItemByTag;
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
        res.json({ message: "oops! an error occured", status: 500 });
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
