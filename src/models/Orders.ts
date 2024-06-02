const { DataTypes } = require("sequelize");
const sequelize = require("../db/config.js");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.STRING,
      values: ["pending", "shipped", "cancelled"],
      defaultValue: "pending",
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Order;
