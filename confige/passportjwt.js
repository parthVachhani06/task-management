const passport = require('passport');
const passportjwt = require('passport-jwt');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const adminmodel = require('../model/Adminmodel');

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'right'
}


passport.use(new JwtStrategy(opts, async function (rj, done) {
    let data = await adminmodel.findById(rj.data._id);
    if (data) {
        return done(null, data)
    }
    else {
        return done(null, false)
    }
}));

passport.serializeUser(function (user, done) {
    return done(null, user.id)
});

passport.deserializeUser(async function (id, done) {
    let admindata = await adminmodel.findById(id);
    if (admindata) {
        return done(null, admindata)
    }
    else {
        return done(null, false)
    }
})