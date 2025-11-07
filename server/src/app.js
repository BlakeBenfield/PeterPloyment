require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.SV_PORT || 3000;

const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const mySQLStore = require('express-mysql-session')(session);
const passport = require("passport");

const entryRouter = require('./routers/entry');
const loginRouter = require('./routers/login');
const tableRouter = require('./routers/table');
const userRouter = require('./routers/user');

const sessionOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "peterployment"
};

app.use(helmet());
app.use(morgan('tiny'));

app.use(session({
    secret: process.env.SV_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new mySQLStore(sessionOptions)
}));

app.use(express.static('./public', { extensions: ['html'] }));
app.use(passport.authenticate('session'));
app.use(express.json());

app.use(entryRouter);
app.use(loginRouter);
app.use(tableRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});