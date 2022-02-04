const logger = require('../logger/logger');
const ClientError = require('./ClientError');
const {ValidationError} = require("sequelize");

const replyServerError = (err, res) => {
  logger.error(err);
  if (err instanceof ClientError) {
    res.status(err.status).send(err);
  } else if (err instanceof ValidationError) {
    res.status(500).send(err.errors);
  } else {
    res.status(520).send(err);
  }
};

module.exports = replyServerError;
