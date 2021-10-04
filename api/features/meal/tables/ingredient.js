const Sequelize = require('sequelize');

export const getTable = db => db
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
