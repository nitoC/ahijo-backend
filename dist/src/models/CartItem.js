"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Product = require("./Product.js");
const sequelize = require("../db/config.js");
const CartItem = sequelize.define("cart-item", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    cart_id: {
        type: sequelize_1.DataTypes.UUID,
    },
});
module.exports = CartItem;
