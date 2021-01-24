const Sequelize = require('sequelize');

const db = require('../../services/db/db');
const logger = require('../../services/logger/logger');

let userDao = {};
userDao.Sequelize = Sequelize;
userDao.UserTable = db
    .getConnection()
    .connection.define('user', {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    }, {tableName: "user"});

userDao.RoleTable = db
    .getConnection()
    .connection.define('role', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    }, {tableName: "role"});

userDao.RoleTable.belongsToMany(userDao.UserTable, {
    through: "user_roles",
    foreignKey: "role_id",
    otherKey: "user_id"
});
userDao.UserTable.belongsToMany(userDao.RoleTable, {
    through: "user_roles",
    foreignKey: "user_id",
    otherKey: "role_id"
});

userDao.ROLES = ["user", "admin", "moderator"];

module.exports = userDao;