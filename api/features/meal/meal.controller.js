const express = require('express');
const dao = require('./meal.dao');
const replyServerError = require("../../services/replyServerError/replyServerError");

const router = express.Router();

router.get('/', [], (req, res) => {
    dao
        .get()
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.post('/', [], (req, res) => {
    dao
        .insert(req.body)
        .then(response => {
            res.status(201).send(response);
        })
        .catch(err => replyServerError(err, res));
});

router.put('/:id', [], (req, res) => {
    dao
        .update(req.params.id, req.body)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => replyServerError(err, res));
});

router.delete('/:id', [], (req, res) => {
    dao
        .delete(req.params.id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => replyServerError(err, res));
});

module.exports = router;
