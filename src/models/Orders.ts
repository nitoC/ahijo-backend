import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const Order = sequelize.define(
  "order",
  {
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
      type: DataTypes.ENUM("pending", "shipped", "cancelled", "delivered"),
      defaultValue: "pending",
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Order;
