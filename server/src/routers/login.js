const argon2 = require('argon2');
const db = require('../db')
const express = require('express');
const router = express.Router();
const validator = require('../schemas/validator');

const passport = require('passport');

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/login/?error=invalid'
}));

router.post('/logout', (req, res, next) =>{
    req.logout((err)=>{
        if (err) return next(err);
        res.redirect('/');
    });
});

router.post('/signup', async (req, res, next) => {
    if (!validator(req.body, 'user')) return res.status(400);
    const password_hash = await argon2.hash(req.body.password);
    try {
        db.query("INSERT INTO users (email, password) VALUES (?, ?)", [req.body.email, password_hash]);
        res.status(200).redirect('/login');
    } catch (e) {
        res.status(400).send("Bad request") //TODO make error page
    }
});