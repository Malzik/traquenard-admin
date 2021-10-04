const Sequelize = require('sequelize');

const getTable = db => db
    .getConnection()
    .connection.define('ingredient', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        }
    }, {tableName: "ingredient"});

module.exports = getTable;