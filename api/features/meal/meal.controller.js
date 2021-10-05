const express = require('express');
const daoMeal = require('./meal.dao');
const daoRecipe = require('./recipe.dao');
const daoIngredient = require('./ingredient.dao');
const replyServerError = require("../../services/replyServerError/replyServerError");

const router = express.Router();

router.get('/', [], (req, res) => {
    daoMeal
        .get()
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.post('/', [], (req, res) => {
    daoMeal
        .insert(req.body)
        .then(response => {
            res.status(201).send(response);
        })
        .catch(err => replyServerError(err, res));
});

router.put('/:id', [], (req, res) => {
    daoMeal
        .update(req.params.id, req.body)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => replyServerError(err, res));
});

router.delete('/:id', [], (req, res) => {
    daoMeal
        .delete(req.params.id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => replyServerError(err, res));
});

router.get('/recipe', [], (req, res) => {
    daoRecipe
        .get()
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.post('/recipe', [], (req, res) => {
    daoRecipe
        .insert(req.body)
        .then(response => {
            res.status(201).send(response);
        })
        .catch(err => replyServerError(err, res));
});

router.put('/recipe/:id', [], (req, res) => {
    daoRecipe
        .update(req.params.id, req.body)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => replyServerError(err, res));
});

router.delete('/recipe/:id', [], (req, res) => {
    daoRecipe
        .delete(req.params.id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => replyServerError(err, res));
});

router.get('/ingredient', [], (req, res) => {
    daoIngredient
        .get()
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.post('/ingredient', [], (req, res) => {
    daoIngredient
        .insert(req.body)
        .then(response => {
            res.status(201).send(response);
        })
        .catch(err => replyServerError(err, res));
});

router.put('/ingredient/:id', [], (req, res) => {
    daoIngredient
        .update(req.params.id, req.body)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => replyServerError(err, res));
});

router.delete('/ingredient/:id', [], (req, res) => {
    daoIngredient
        .delete(req.params.id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => replyServerError(err, res));
});

module.exports = router;
