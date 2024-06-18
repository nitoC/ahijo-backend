import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

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
  product_id: {
    type: DataTypes.UUID,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});

module.exports = CartItem;
