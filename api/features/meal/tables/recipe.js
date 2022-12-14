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
            allowNull: false,
            validate: {
                len: [2, 50]
            }
        },
        image: {
            type: Sequelize.STRING,
            defaultValue: "empty.png",
            allowNull: true
        }
    }, {tableName: "recipe", underscored: true});

module.exports = getTable;
