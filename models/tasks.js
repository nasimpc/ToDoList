const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Tasks = sequelize.define('Tasks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    task: Sequelize.STRING,
    done: Sequelize.BOOLEAN,

})

module.exports = Tasks;