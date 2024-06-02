const sequelize = require('sequelize').Sequelize;
const dotenv = require('dotenv');
dotenv.config()

const db = process.env.DB;
const user = process.env.USER;
const password = process.env.PASSWORD;

console.log(password, 'password')
const sequelizedDb = new sequelize(db, user, password, {
    dialect: 'postgres',
    host: 'localhost'
})

module.exports = sequelizedDb;