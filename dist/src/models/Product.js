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
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    top_image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    right_image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    left_image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    sex: {
        type: sequelize_1.DataTypes.ENUM("male", "female", "unisex"),
        defaultValue: "unisex",
        allowNull: false,
    },
    sizes: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
    },
    tags: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.ENUM("top deal", "new arrival", "best seller", "limited edition")),
        allowNull: true,
    },
}, {
    timestamps: true, // Consider setting to true if you need createdAt and updatedAt fields
});
module.exports = Product;
