const argon2 = require('argon2');
const db = require('../db')
const express = require('express');
const router = express.Router();
const validator = require('../schemas/validator');

const passport = require('passport');
const { checkAuth } = require("./auth");

router.post('/login/password', passport.authenticate('local', { successRedirect: '/app' }), (req, res) => {
    res.status(400).send();
});

router.post('/logout', checkAuth, (req, res, next) =>{
    req.logout((err)=>{
        if (err) return next(err);
        res.redirect('/');
    });
});

router.post('/signup', async (req, res, next) => {
    if (!validator(req.body, 'user')) return res.status(400).json({ message: "Bad request" });
    const password_hash = await argon2.hash(req.body.password);
    try {
        await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [req.body.email, password_hash]); //TODO may return failure
        res.status(200).json({ message: "User created successfully" });
    } catch (e) {
        if (e.code === "ER_DUP_ENTRY") return res.status(400).json({ message: "User already exists!" });
        res.status(400).json({ message: "Bad request" });
    }
});

router.get('/auth/status', (req, res) => {
    if (req.user) res.json({ authenticated: true });
    else res.json({ authenticated: false });
});

module.exports = router;