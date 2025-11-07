const express = require('express');
const router = express.Router();
const db = require('../db')
const {checkAuth} = require("./auth");
const FormData = require('form-data');
const Mailgun = require('mailgun.js')
const validator = require("../schemas/validator");

router.delete('/user', checkAuth, async (req, res) => {
    try {
        await db.query('DELETE FROM users WHERE id = ?', [req.user.id]); //TODO can fail
        req.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/user/forgot-password', async (req, res) => {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
        username: 'api',
        key: process.env.MAILGUN_API_KEY
    });
    try {
        const data = await mg.messages.create("userservices.peterployment.com", {
            from: "<server@userservices.peterployment.com>",
            to: [req.body.email], //TODO check if email valid and exists in db, also create a password reset table.
            subject: "Password Reset - Peterployment",
            text: "Yo, reset your password here: https://peterployment.com/user/forgot-password?token=abc123"
        });
    } catch (e) {
        console.log(e);
    }
    res.status(200).send();
});

router.post('/user', async (req, res) => {
    if (!validator(req.body, 'user')) return res.status(400).send();
    await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [req.body.email, req.body.password]);
    res.status(200).send();
});

module.exports = router;