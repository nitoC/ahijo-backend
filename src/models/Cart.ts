import { DataTypes } from "sequelize";
const CartItem = require("./CartItem.js");

const sequelize = require("../db/config.js");

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Cart;
