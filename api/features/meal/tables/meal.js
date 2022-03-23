const Sequelize = require('sequelize');

const getTable = db => db
    .getConnection()
    .connection.define('meal', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        order: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        recipe_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'Recipe',
                key: 'id'
            }
        },
    }, {tableName: "meal", underscored: true});

module.exports = getTable;
