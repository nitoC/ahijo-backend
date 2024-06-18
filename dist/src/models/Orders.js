"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_js_1 = __importDefault(require("../db/config.js"));
const Order = config_js_1.default.define("order", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    totalAmount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    order_status: {
        type: sequelize_1.DataTypes.STRING,
        values: ["pending", "shipped", "cancelled", "delivered"],
        defaultValue: "pending",
        allowNull: false,
    },
}, {
    timestamps: true,
});
module.exports = Order;
