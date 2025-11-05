const passport = require('passport');
const LocalStrategy = require('passport-local');
const argon2 = require('argon2');
const db = require('../db');

// From passport docs
passport.use(new LocalStrategy(async (email, password, cb) => {
    try {
        const [results, fields] = await db.query("SELECT * FROM users WHERE email=?", [email]);

        let hash = "1"

        if (results.length > 0) hash = results[0].password;
        let isValid = await argon2.verify(hash, password);

        if (isValid) {
            return cb(null, results[0]);
        } else {
            return cb(null, false, { message: "Incorrect email or password." })
        }
    } catch (e) {
        return cb(e);
    }
}));

passport.serializeUser((user, cb) => {
    process.nextTick(()=>{
        cb(null, { id:  user.id, email: user.email });
    });
});

passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
       return cb(null, user);
    });
});

const checkAuth = (req, res, next) => {
    if(req.user) next();
    else next("User not authenticated");
};

module.exports = { checkAuth }