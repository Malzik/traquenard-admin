const Sequelize = require('sequelize');

const getTable = db => db
    .getConnection()
    .connection.define('recipe', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        }
    }, {tableName: "recipe"});

module.exports = getTable;