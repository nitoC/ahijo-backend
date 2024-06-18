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
exports.deleteProduct = exports.getAllProductBySex = exports.getAllProductByCategory = exports.getProduct = exports.addProduct = void 0;
const product = require("../models/Product.js");
const addProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data, "add repo");
    try {
        const item = yield product.create(data);
        return item;
    }
    catch (error) {
        console.log(error, "add product error");
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
    }
});
exports.getAllProductByCategory = getAllProductByCategory;
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
    }
});
exports.getAllProductBySex = getAllProductBySex;
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
    }
});
exports.deleteProduct = deleteProduct;
