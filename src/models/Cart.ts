import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

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
