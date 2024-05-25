const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Lists = sequelize.define('Lists', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING

})

module.exports = Lists;