const Sequelize = require("sequelize")
const config = require("./config")


const dbName = config.development.database;
const dbHost = config.development.host;
const dbUsername = config.development.username;
const dbPassword = config.development.password;
const dbDialect = config.development.dialect

const sequelizeConnection = new Sequelize(
    dbName,
    dbUsername,
    dbPassword,
    {
        host: dbHost,
        dialect: dbDialect,
    }
);


module.exports = sequelizeConnection
