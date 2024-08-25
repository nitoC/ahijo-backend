"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_js_1 = __importDefault(require("../db/config.js"));
const CartItem = config_js_1.default.define("cart_item", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    cart_id: {
        type: sequelize_1.DataTypes.UUID,
        onDelete: "CASCADE",
    },
    product_id: {
        type: sequelize_1.DataTypes.UUID,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    size: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
});
module.exports = CartItem;
