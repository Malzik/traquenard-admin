const Sequelize = require('sequelize');

export const getTable = db => db
    .getConnection()
    .connection.define('recipe_ingredient', {
        recipe_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'Recipe',
                key: 'id'
            }
        },
        ingredient_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'Ingredient',
                key: 'id'
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
        },
        unit: {
            type: Sequelize.STRING,
        }
    }, {tableName: "recipe_ingredient"});
