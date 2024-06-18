const { DataTypes } = require("sequelize");
import sequelize from "../db/config.js";

const UserDetails = sequelize.define("user-details", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = UserDetails;
