const express = require('express');
const session = require('express-session');
const port = 3006
const path = require('path');
const app = express();
const db = require('./confige/mongoose');
const passport = require('passport');
const passportjwt = require('./confige/passportjwt')

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'upload')));




app.use(session({
    name: 'interview3',
    secret: 'batch',
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 100
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/admin', require('./routs/admin'));

app.listen(port, (err) => {
    if (err) {
        console.log("something wronge");
    }
    console.log("server running successfully on port", port);
})