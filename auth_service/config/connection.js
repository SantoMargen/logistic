const Sequelize = require("sequelize")
const config = require("./config")


const dbName = config.development.database;
const dbHost = config.development.host;
const dbUsername = config.development.username;
const dbPassword = config.development.password;
const dbDialect = config.development.dialect

const dbNameTest = config.test.database;
const dbHostTest = config.test.host;
const dbUsernameTest = config.test.username;
const dbPasswordTest = config.test.password;
const dbDialectTest = config.test.dialect

let sequelizeConnection

if (process.env.NODE_ENV === 'test') {
    sequelizeConnection = new Sequelize(
        dbNameTest,
        dbUsernameTest,
        dbPasswordTest,
        {
            host: dbHostTest,
            dialect: dbDialectTest,
        }
    );
} else {
    sequelizeConnection = new Sequelize(
        dbName,
        dbUsername,
        dbPassword,
        {
            host: dbHost,
            dialect: dbDialect,
        }
    );
}

module.exports = sequelizeConnection
