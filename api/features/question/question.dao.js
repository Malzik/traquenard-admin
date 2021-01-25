const Sequelize = require('sequelize');
const { Op } = require("sequelize");

const db = require('../../services/db/db');
const logger = require('../../services/logger/logger');

const QuestionTable = db
    .getConnection()
    .connection.define('question', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rule: {
            type: Sequelize.STRING,
        },
        sip: {
            type: Sequelize.STRING,
        },
        answers: {
            type: Sequelize.JSON,
        },
        lang: {
            type: Sequelize.STRING,
        },
        type_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Type',
                key: 'id'
            }
        }
}, {tableName: "question"});

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

QuestionTable.belongsTo(TypeTable, {
    foreignKey: 'type_id',
    as: "type"
})

const questionDao = {
    get: () =>
        new Promise((resolve, reject) => {
            QuestionTable.findAll({
                include: [{
                    model: TypeTable,
                    as: "type",
                    required: true,
                    attributes: ['name'],
                }],
                order: [['type_id', 'ASC']]
            })
                .then(results => resolve(results))
                .catch(err => reject(err));
        }),
    getQuestionsByLang: lang =>
        new Promise((resolve, reject) => {
            QuestionTable.findAll({
                include: [{
                    model: TypeTable,
                    as: "type",
                    required: true,
                    attributes: ['name'],
                }],
                where: {
                    lang: {
                        [Op.eq]: lang
                    }
                },
                order: [['type_id', 'ASC']]
            })
                .then(result => resolve(result))
                .catch(err => reject(err));
        }),
    getById: id =>
        new Promise((resolve, reject) => {
            QuestionTable.findByPk(id)
                .then(result => resolve(result))
                .catch(err => reject(err));
        }),
    getByType: typeId =>
        new Promise((resolve, reject) => {
            QuestionTable.findAll({
                where: {
                    type_id: typeId
                }
            })
                .then(result => resolve(result))
                .catch(err => reject(err));
        }),
    insert: question =>
        new Promise((resolve, reject) => {
            QuestionTable.create({
                type_id: question.type_id,
                rule: question.rule,
                sip: question.sip,
                answers: question.answers,
                lang: question.lang,
            })
                .then(() => resolve(201))
                .catch(err => reject(err));
        }),
    update: (id, newQuestion) =>
        new Promise((resolve, reject) => {
            console.log(id, newQuestion)
            QuestionTable.findByPk(id)
                .then(question =>
                    question
                        .update(newQuestion)
                        .then(() => resolve(200))
                        .catch(err => reject(err))

                )
                .catch(err => reject(err));
        }),
    delete: id =>
        new Promise((resolve, reject) => {
            QuestionTable.findByPk(id)
                .then(question =>
                    question
                        .destroy()
                        .then(() => resolve(204))
                        .catch(err => reject(err))

                )
                .catch(err => reject(err));
        })
};

module.exports = questionDao;
