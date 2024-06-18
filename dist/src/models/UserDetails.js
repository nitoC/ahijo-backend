"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const config_js_1 = __importDefault(require("../db/config.js"));
const UserDetails = config_js_1.default.define("user-details", {
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
