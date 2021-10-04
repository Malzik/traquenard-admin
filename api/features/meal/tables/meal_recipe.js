const Sequelize = require('sequelize');

const getTable = db => db
    .getConnection()
    .connection.define('meal_recipe', {
        meal_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'Meal',
                key: 'id'
            }
        },
        recipe_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'Recipe',
                key: 'id'
            }
        },
    }, {tableName: "meal_recipe"});

module.exports = getTable;