const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ListUser = sequelize.define('ListUsers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

},
    {
        timestamps: false
    });

module.exports = ListUser;