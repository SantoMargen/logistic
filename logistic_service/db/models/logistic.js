'use strict';
const Sequelize = require('sequelize');
const connection = require("../../config/connesction")

const Logistic = connection.define("logistics",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        logistic_name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        amount: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        destination_name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        origin_name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        duration: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Date.now()
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Date.now()
        },
    }, { underscored: true }
);

module.exports = Logistic