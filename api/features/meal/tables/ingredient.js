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
            allowNull: false,
            validate: {
                len: [2, 50]
            }
        }
    }, {tableName: "ingredient", underscored: true});

module.exports = getTable;
