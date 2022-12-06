const express = require('express');
const app = express();
const router = require('./router');
const { sequelize } = require('./models');
const logMiddleware = require('./middleware/log.middleware');
const morgan = require('morgan');
const cors = require("cors");
require('./db/db');
require('colors');

//Config Cors Options aws
var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

let PORT = process.env.YOUR_PORT || process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);
app.use(morgan('dev'));
app.use(logMiddleware);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`.bgGreen.red);

    sequelize.authenticate().then(() => {
        console.log("Connected to DB...");
    }).catch(error => {
        console.log('Something went wrong: ', error);
    })
});