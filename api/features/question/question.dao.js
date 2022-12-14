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
            required: false
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
        },
        translation_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Question',
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
QuestionTable.belongsTo(QuestionTable, {
    foreignKey: 'id',
    targetKey: 'translation_id',
    as: "translate"
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
    getByType: (typeId, lang) =>
        new Promise((resolve, reject) => {
            QuestionTable.findAll({
                where: {
                    type_id: typeId,
                    lang: lang
                }
            })
                .then(result => resolve(result))
                .catch(err => reject(err));
        }),
    getQuestionsWithTranslate: (initialLang, lang) =>
        new Promise((resolve, reject) => {
            QuestionTable.findAll({
                include: [{
                    model: TypeTable,
                    as: "type",
                    required: true,
                    attributes: ['name'],
                }, {
                    model: QuestionTable,
                    as: "translate",
                    required: false,
                    where: {
                        lang: {
                            [Op.eq]: lang
                        }
                    }
                }],
                where: {
                    lang: {
                        [Op.eq]: initialLang
                    }
                },
                group: ['id', 'type_id'],
                order: [['type_id', 'ASC']]
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
    insertTranslateRule: question =>
        new Promise((resolve, reject) => {
            QuestionTable.create({
                type_id: question.type_id,
                rule: question.rule,
                sip: question.sip,
                answers: question.answers,
                lang: question.lang,
                translation_id: question.translation_id,
            })
                .then(() => resolve(201))
                .catch(err => reject(err));
        }),
    update: (id, newQuestion) =>
        new Promise((resolve, reject) => {
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
        }),
    getLang: () =>
        new Promise((resolve, reject) => {
            QuestionTable.findAll({
                attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('lang')), 'lang'],
                ]
            })
                .then(result => resolve(result))
                .catch(err => reject(err));
        }),
};

module.exports = questionDao;
