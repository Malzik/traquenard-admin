const dotenv = require('dotenv');
const Sequelize = require('sequelize');
const logger = require('../logger/logger');
const dbConfig = require("../../config/db.config.js");

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
let connection = null;

const reconnectOptions = {
    max_retries: 50,
    onRetry(count) {
        logger.log(`connection lost, trying to reconnect (${count})`);
    },
};
const createConnection = () => {
    logger.log('Connecting database...');
    const sequelize = new Sequelize(
        dbConfig.DB,
        dbConfig.USER,
        dbConfig.PASSWORD,
        {
            host: dbConfig.HOST,
            dialect: dbConfig.DIALECT,
            port: dbConfig.PORT,
            define: {
                timestamps: false,
            },
            reconnect: reconnectOptions || true,
            dialectOptions: { decimalNumbers: true },
        }
    );

    const promise = new Promise((resolve, reject) => {
        sequelize
            .authenticate()
            .then(() => {
                logger.log('Connected');
                resolve();
            })
            .catch(err => {
                logger.log('Connection failed', err);
                reject(err);
            });
    });

    return {
        connection: sequelize,
        promise,
    };
};

const getConnection = () => {
    if (connection === null) {
        connection = createConnection();
    }
    return connection;
};

module.exports = { getConnection };
