'use strict';
const Sequelize = require('sequelize');
const connection = require("../../config/connection")


const Auth = connection.define('auths',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    msisdn: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
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

  }, {
  hooks: {
    beforeCreate: (auth, options) => {
      auth.msisdn = "62" + auth.msisdn
    }
  },
  underscored: true,
}
);

module.exports = Auth