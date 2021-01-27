const express = require('express');
const dao = require('./question.dao');
const replyServerError = require("../../services/replyServerError/replyServerError");
const authJwt = require("../../middleware/authJwt");

const router = express.Router();

router.get('/', [authJwt.verifyToken], (req, res) => {
    dao
        .get()
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.get('/lang/:lang', [authJwt.verifyToken], (req, res) => {
    dao
        .getQuestionsByLang(req.params.lang)
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.get('/:id', [authJwt.verifyToken], (req, res) => {
    dao
        .getById(req.params.id)
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.get('/type/:typeId', [authJwt.verifyToken], (req, res) => {
    dao
        .getByType(req.params.typeId)
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.get('/translate/:initialLang/:lang', [authJwt.verifyToken], (req, res) => {
    dao
        .getQuestionsWithTranslate(req.params.initialLang, req.params.lang)
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.post('/', [authJwt.verifyToken], (req, res) => {
    dao
        .insert(req.body)
        .then(response => {
            res.status(201).send(response);
        })
        .catch(err => replyServerError(err, res));
});

router.post('/translate', [authJwt.verifyToken], (req, res) => {
    dao
        .insertTranslateRule(req.body)
        .then(response => {
            res.status(201).send(response);
        })
        .catch(err => replyServerError(err, res));
});

router.put('/:id', [authJwt.verifyToken], (req, res) => {
    dao
        .update(req.params.id, req.body)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => replyServerError(err, res));
});

router.delete('/:id', [authJwt.verifyToken], (req, res) => {
    dao
        .delete(req.params.id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => replyServerError(err, res));
});

module.exports = router;