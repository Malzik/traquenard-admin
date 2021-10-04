const Sequelize = require('sequelize');

const getTable = db => db
    .getConnection()
    .connection.define('meal', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
        },
        date: {
            type: Sequelize.DATE,
        }
    }, {tableName: "meal"});

module.exports = getTable;
