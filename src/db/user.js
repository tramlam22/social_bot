/* model for user's profile information */

const sequelize = require('./db.js');
const { Sequelize } = require('sequelize');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    server: Sequelize.STRING,

});

module.exports = User;