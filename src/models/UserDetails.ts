const { DataTypes } = require("sequelize");
const sequelize = require("../db/config.js");
const User = require("./User.js");

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
