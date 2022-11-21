const express = require('express');
const daoMeal = require('./meal.dao');
const daoRecipe = require('./recipe.dao');
const daoIngredient = require('./ingredient.dao');
const replyServerError = require("../../services/replyServerError/replyServerError");
const authJwt = require("../../middleware/authJwt");

const router = express.Router();

router.get('/', [authJwt.verifyToken], (req, res) => {
    daoMeal
        .get()
        .then(meals => res.status(200).json(meals))
        .catch(err => replyServerError(err, res));
});

router.post('/', [authJwt.verifyToken], (req, res) => {
    daoMeal
        .insert(req.body)
        .then(response => {
            res.status(201).send(response);
        })
        .catch(err => replyServerError(err, res));
});

router.put('/:id', [authJwt.verifyToken], (req, res) => {
    daoMeal
        .update(req.params.id, req.body)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => replyServerError(err, res));
});

router.delete('/:id', [authJwt.verifyToken], (req, res) => {
    daoMeal
        .delete(req.params.id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => replyServerError(err, res));
});

router.get('/recipe', [authJwt.verifyToken], (req, res) => {
    daoRecipe
        .get()
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.post('/recipe', [authJwt.verifyToken], (req, res) => {
    daoRecipe
        .insert(req.body)
        .then(response => {
            res.status(201).send(response);
        })
        .catch(err => replyServerError(err, res));
});

router.put('/recipe/:id', [authJwt.verifyToken], (req, res) => {
    daoRecipe
        .update(req.params.id, req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(err => replyServerError(err, res));
});

router.delete('/recipe/:id', [authJwt.verifyToken], (req, res) => {
    daoRecipe
        .delete(req.params.id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => replyServerError(err, res));
});

router.get('/ingredient', [authJwt.verifyToken], (req, res) => {
    daoIngredient
        .get()
        .then(response => res.status(200).send(response))
        .catch(err => replyServerError(err, res));
});

router.post('/ingredient', [authJwt.verifyToken], (req, res) => {
    daoIngredient
        .insert(req.body)
        .then(response => {
            res.status(201).send(response);
        })
        .catch(err => replyServerError(err, res));
});

router.put('/ingredient/:id', [authJwt.verifyToken], (req, res) => {
    daoIngredient
        .update(req.params.id, req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(err => replyServerError(err, res));
});

router.delete('/ingredient/:id', [authJwt.verifyToken], (req, res) => {
    daoIngredient
        .delete(req.params.id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => replyServerError(err, res));
});

module.exports = router;
