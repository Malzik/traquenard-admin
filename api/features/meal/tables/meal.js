const Sequelize = require('sequelize');

export const getTable = db => db
    .getConnection()
    .connection.define('recipe', {
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
    }, {tableName: "recipe"});
