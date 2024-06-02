const { DataTypes } = require("sequelize");
const sequelize = require("../db/config.js");

const UserDetails = sequelize.define("user-detail", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
});

module.exports = UserDetails;
