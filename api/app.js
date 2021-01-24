const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('./services/logger/logger');

const app = express();

const authRouter = require('./features/auth/auth.controller');
const questionRouter = require('./features/question/question.controller');
const typeRouter = require('./features/type/type.controller');
const defaultController = require("./features/default.controller");
const db = require("./services/db/db");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/auth', authRouter);
app.use('/api/question', questionRouter);
app.use('/api/type', typeRouter);

app.use(defaultController);

// db.getConnection().connection.sync()

app.server = app.listen(process.env.PORT || 5000, () => {
    logger.success(`Listening on port ${app.server.address().port}`);
});

module.exports = app;