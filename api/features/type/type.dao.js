const Sequelize = require('sequelize');

const db = require('../../services/db/db');
const logger = require('../../services/logger/logger');

const TypeTable = db
    .getConnection()
    .connection.define('Type', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subtype_id: {
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
        }
    }, {tableName: "type"});

TypeTable.belongsTo(TypeTable, {
    foreignKey: 'subtype_id',
    as: "type2"
})
const typeDao = {
    get: () =>
        new Promise((resolve, reject) => {
            TypeTable.findAll({
                where:
                    Sequelize.literal("id not in (select subtype_id FROM type where subtype_id IS NOT NULL)")
            })
                .then(results => resolve(results))
                .catch(err => reject(err));
        }),
    getById: id =>
        new Promise((resolve, reject) => {
            TypeTable.findByPk(id)
                .then(result => resolve(result))
                .catch(err => reject(err));
        }),
    getWithoutSubType: () =>
        new Promise((resolve, reject) => {
            TypeTable.findAll({
                where:
                    Sequelize.literal("id not in (SELECT distinct(subtype_id) from type where subtype_id is not null) AND subtype_id IS NULL")
            })
                .then(result => resolve(result))
                .catch(err => reject(err));
        }),
    getWithSubType: () =>
        new Promise((resolve, reject) => {
            TypeTable.findAll({
                include: [{
                    model: TypeTable,
                    as: "type2",
                    required: true,
                    attributes: [['name', 'parent_name']],
                }],
            })
                .then(result => resolve(result))
                .catch(err => reject(err));
        }),
};

module.exports = typeDao;
//Sequelize.query("SELECT t.id as id, t.name as name, t2.name as parent_name FROM type t LEFT JOIN type t2 on t.subtype_id = t2.id WHERE t.subtype_id is NOT NULL")