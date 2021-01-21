const Question = require("../models/question.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const question = new Question({
        rule: req.body.rule,
        sip: req.body.sip,
        answer: req.body.answer,
        lang: req.body.lang
    });

    Question.create(question, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Question."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Question.findAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving questions."
            });
        else res.send(data);
    });
};

exports.findById = (req, res) => {
    Question.findById(req.params.questionId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Question with id ${req.params.questionId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Question with id " + req.params.questionId
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Question.updateById(
        req.params.questionId,
        new Question(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Question with id ${req.params.questionId}.`
                    });
                } else {
                    res.status(500).send({
                        message: err.message
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Question.remove(req.params.questionId, (err) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Question with id ${req.params.questionId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Question with id " + req.params.questionId
                });
            }
        } else res.send({ message: `Question was deleted successfully!` });
    });
};
