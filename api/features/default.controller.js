const logger = require('../services/logger/logger');

const defaultController = (req, res, next) => {
  logger.error(`Route ${req.url} not found.`);
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

module.exports = defaultController;
