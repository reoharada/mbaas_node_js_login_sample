const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();

app.use(bodyParser.json({
    limit: '50mb',
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true,
}));

app.use(cookieParser())

app.set("view engine", "ejs");

const index = require('./routes/index');
const login = require('./routes/login');
const logout = require('./routes/logout');
const regist = require('./routes/regist');

app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/regist', regist);

app.listen(3000, () => console.log('app listening on port 3000'))
