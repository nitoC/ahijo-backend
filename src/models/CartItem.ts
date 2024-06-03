import { DataTypes } from "sequelize";
const Product = require("./Product.js");

const sequelize = require("../db/config.js");

const CartItem = sequelize.define("cart-item", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  cart_id: {
    type: DataTypes.UUID,
  },
});

module.exports = CartItem;
