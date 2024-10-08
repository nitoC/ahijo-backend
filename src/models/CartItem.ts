import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const CartItem = sequelize.define("cart_item", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  cart_id: {
    type: DataTypes.UUID,
    onDelete: "CASCADE",
  },
  product_id: {
    type: DataTypes.UUID,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = CartItem;
