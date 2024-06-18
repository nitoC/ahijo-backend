"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_js_1 = __importDefault(require("../db/config.js"));
const Product = config_js_1.default.define("product", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    },
    top_image: {
        type: sequelize_1.DataTypes.STRING,
    },
    right_image: {
        type: sequelize_1.DataTypes.STRING,
    },
    left_image: {
        type: sequelize_1.DataTypes.STRING,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    sex: {
        type: sequelize_1.DataTypes.STRING,
    },
    sizes: {
        type: sequelize_1.DataTypes.JSON,
    },
}, {
    timestamps: false,
});
module.exports = Product;
