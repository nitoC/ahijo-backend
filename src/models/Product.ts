import { DataTypes } from "sequelize";

import sequelize from "../db/config.js";

const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
    top_image: {
      type: DataTypes.STRING,
    },
    right_image: {
      type: DataTypes.STRING,
    },
    left_image: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    sex: {
      type: DataTypes.STRING,
      values: ["male", "female", "unisex"],
      defaultValue: "unisex",
    },
    sizes: {
      type: DataTypes.JSON,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Product;
