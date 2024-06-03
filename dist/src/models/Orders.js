"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require("../db/config.js");
const User = require("./User.js");
const OrderDetails = require("./OrderDetails.js");
const Order = sequelize.define("order", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    order_status: {
        type: DataTypes.STRING,
        values: ["pending", "shipped", "cancelled"],
        defaultValue: "pending",
        allowNull: false,
    },
}, {
    timestamps: true,
});
module.exports = Order;
