const express = require('express');
const dao = require('./type.dao');
const replyServerError = require("../../services/replyServerError/replyServerError");
const authJwt = require("../../middleware/authJwt");

const router = express.Router();

router.get('/', [authJwt.verifyToken], (req, res) => {
    dao
        .get()
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.get('/subtype', [authJwt.verifyToken], (req, res) => {
    dao
        .getWithSubType()
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.get('/noSubtype', [authJwt.verifyToken], (req, res) => {
    dao
        .getWithoutSubType()
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.get('/:id', [authJwt.verifyToken], (req, res) => {
    dao
        .getById(req.params.id)
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

module.exports = router;