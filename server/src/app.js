require('dotenv').config();
const https = require('node:https');
const http = require('node:http');
const fs = require('fs');
const path = require('path');
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

app.set("trust proxy", 1);
app.use(helmet());
app.use(morgan('tiny'));

app.use(session({
    secret: process.env.SV_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new mySQLStore(sessionOptions),
    cookie: {
        httpOnly: true,
        secure: true,
        path: '/'
    }
}));

app.use(express.static('./public'));
app.use(passport.authenticate('session'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(entryRouter);
app.use(loginRouter);
app.use(tableRouter);
app.use(userRouter);

app.all('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

https.createServer(
    {
        key: fs.readFileSync("/etc/cfcerts/privatekey.pem"),
        cert: fs.readFileSync("/etc/cfcerts/cert.pem")
    },
    app
).listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port ${port}`);
});

http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://peterployment.com${req.url}` }) ;
    res.end();
}).listen(80);