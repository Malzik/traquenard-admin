const express = require('express');
const authDao = require('./auth.dao');
const replyServerError = require("../../services/replyServerError/replyServerError");
const verifySignUp = require("../../middleware/verifySignUp");

const router = express.Router();

router.post('/signin', (req, res) => {
    authDao
        .signin(req, res)
        .then(response => response)
        .catch(err => replyServerError(err, res));
});

router.post('/signup',[
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
], (req, res) => {
    authDao
        .signup(req, res)
        .then(response => response)
        .catch(err => replyServerError(err, res));
});

module.exports = router;