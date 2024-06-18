import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const Cart = sequelize.define("cart", {
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
});

module.exports = Cart;
