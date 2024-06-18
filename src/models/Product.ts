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
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    top_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    right_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    left_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sex: {
      type: DataTypes.ENUM("male", "female", "unisex"),
      defaultValue: "unisex",
      allowNull: false,
    },
    sizes: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    tags: {
      type: DataTypes.ARRAY(
        DataTypes.ENUM(
          "top deal",
          "new arrival",
          "best seller",
          "limited edition"
        )
      ),
      allowNull: true,
    },
  },
  {
    timestamps: true, // Consider setting to true if you need createdAt and updatedAt fields
  }
);

module.exports = Product;
