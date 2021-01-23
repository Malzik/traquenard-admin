const express = require('express');
const dao = require('./question.dao');
const replyServerError = require("../../services/replyServerError/replyServerError");

const router = express.Router();

router.get('/', (req, res) => {
    dao
        .get()
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.get('/:id', (req, res) => {
    dao
        .getById(req.params.id)
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.get('/type/:typeId', (req, res) => {
    dao
        .getByType(req.params.typeId)
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.post('/', (req, res) => {
    dao
        .insert(req.body)
        .then(response => {
            res.status(201).send(response);
        })
        .catch(err => replyServerError(err, res));
});

router.put('/:id', (req, res) => {
    dao
        .update(req.body)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => replyServerError(err, res));
});

router.delete('/:id', (req, res) => {
    dao
        .delete(req.params.id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => replyServerError(err, res));
});

module.exports = router;