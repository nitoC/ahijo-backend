"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const sequelize = require("../db/config.js");
const Sequelize = require("sequelize");
const processLocal = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
//const config = require(__dirname + '/../config/config.json')[env];
const db = {};
// let sequelize;
// if (config.use_env_variable) {
//     sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//     sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
fs.readdirSync(__dirname)
    //@ts-ignore
    .filter((file) => {
    return (file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        file.indexOf(".test.js") === -1);
})
    //@ts-ignore
    .forEach((file) => {
    const model = require(path.join(__dirname, file));
    //@ts-ignore
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    //@ts-ignore
    if (db[modelName].associate) {
        //@ts-ignore
        db[modelName].associate(db);
    }
});
//@ts-ignore
db.sequelize = sequelize;
module.exports = db;
