const clc = require('cli-color');

const mapping = {
  log: clc.yellow,
  success: clc.green,
  warn: clc.yellow,
  error: clc.red,
};

const logger = {
  log: () => {},
  success: () => {},
  warn: () => {},
  error: () => {},
};

['warn', 'error', 'success', 'log'].forEach(method => {
  // eslint-disable-next-line no-console
  const oldMethod = (console[method] || console.log).bind(console);
  logger[method] = (...args) => {
    oldMethod.apply(
      console,
      [
        mapping[method](
          `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} [${method
            .toLocaleUpperCase()
            .padStart(7, ' ')}] `
        ),
      ].concat(args)
    );
  };
});

module.exports = logger;
