const express = require('express');
const dao = require('./type.dao');
const replyServerError = require("../../services/replyServerError/replyServerError");

const router = express.Router();

router.get('/', (req, res) => {
    dao
        .get()
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.get('/subtype', (req, res) => {
    dao
        .getWithSubType()
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.get('/noSubtype', (req, res) => {
    dao
        .getWithoutSubType()
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.get('/:id', (req, res) => {
    dao
        .getById(req.params.id)
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

module.exports = router;