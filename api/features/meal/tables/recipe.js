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
            allowNull: false
        }
    }, {tableName: "recipe", underscored: true});

module.exports = getTable;
