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
exports.deleteProduct = exports.getAllProductByTag = exports.getAllProductBySex = exports.getAllProductByName = exports.getAllProductByCategory = exports.getProduct = exports.addProduct = void 0;
const sequelize_1 = require("sequelize");
const product = require("../models/Product.js");
const addProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data, "add repo");
    try {
        const item = yield product.create(data);
        return item;
    }
    catch (error) {
        console.log(error, "add product error");
        throw new Error("unable to add new product Items");
    }
});
exports.addProduct = addProduct;
const getProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield product.findByPk(data.item_id);
        console.log(item, "item");
        return item;
    }
    catch (error) {
        console.log(error, "get product error");
        throw new Error("unable to fetch product Items");
    }
});
exports.getProduct = getProduct;
const getAllProductByCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const factor = 18;
    try {
        const item = yield product.findAll({
            where: {
                category: data.category,
            },
            limit: data.limitVal * factor,
            offset: data.offsetVal * factor,
        });
        return item;
    }
    catch (error) {
        console.log(error, "get product error");
        throw new Error("unable to fetch product Items");
    }
});
exports.getAllProductByCategory = getAllProductByCategory;
const getAllProductByName = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const factor = 18;
    try {
        const item = yield product.findAll({
            attributes: ["id", "name", "description"],
            where: {
                name: { [sequelize_1.Op.iLike]: `%${data.name}%` },
            },
            limit: data.limitVal * factor,
            offset: data.offsetVal * factor,
        });
        console.log(item, "item get product by name");
        return item;
    }
    catch (error) {
        console.log(error, "get product error");
        throw new Error("unable to fetch product Items");
    }
});
exports.getAllProductByName = getAllProductByName;
const getAllProductBySex = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const factor = 18;
    try {
        const item = yield product.findAll({
            where: {
                sex: data.sex,
            },
            limit: data.limitVal * factor,
            offset: data.offsetVal * factor,
        });
        return item;
    }
    catch (error) {
        console.log(error, "get product error");
        throw new Error("unable to fetch product Items");
    }
});
exports.getAllProductBySex = getAllProductBySex;
const getAllProductByTag = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const factor = 18;
    try {
        const item = yield product.findAll({
            where: {
                tags: {
                    [sequelize_1.Op.contains]: [data.tag],
                },
            },
            limit: data.limitVal * factor,
            offset: data.offsetVal * factor,
        });
        return item;
    }
    catch (error) {
        console.log(error, "get product error");
        throw new Error("unable to fetch product Items");
    }
});
exports.getAllProductByTag = getAllProductByTag;
const deleteProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield product.destroy({
            where: {
                id: data,
            },
        });
        return item;
    }
    catch (error) {
        console.log(error, "remove product error");
        throw new Error("Oops! something went wrong. Unable delete product Items");
    }
});
exports.deleteProduct = deleteProduct;
