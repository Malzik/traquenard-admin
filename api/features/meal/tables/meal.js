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
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {tableName: "meal", underscored: true});

module.exports = getTable;
