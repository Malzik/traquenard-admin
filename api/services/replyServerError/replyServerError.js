const logger = require('../logger/logger');
const ClientError = require('./ClientError');

const replyServerError = (err, res) => {
  logger.error(err);
  if (err instanceof ClientError) {
    res.status(err.status).send(err.message);
  } else {
    res.status(520).send(err.message);
  }
};

module.exports = replyServerError;
