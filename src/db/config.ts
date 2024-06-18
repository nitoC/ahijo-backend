import { Sequelize as sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = process.env.DB;
const user = process.env.USER;
const password = process.env.PASSWORD;

console.log(password, "password");
const sequelizedDb = new sequelize(db as string, user as string, password, {
  dialect: "postgres",
  host: "localhost",
});

export default sequelizedDb;
