const express = require('express');
const routs = express.Router();
const managarcontroller = require('../controller/managercontroller');
const passport = require('passport');


routs.post('/addmanagar', passport.authenticate('jwt', { failureRedirect: "/admin/managar/faillogin" }), managarcontroller.addmanagar);

routs.get('/faillogin', (req, res) => {
    return res.status(400).json({ msg: "faillogin", status: 0 })
})


module.exports = routs;