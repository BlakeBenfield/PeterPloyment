const {checkAuth} = require("./auth");
const db = require('../db')
const validator = require('../schemas/validator');
const express = require('express');
const router = express.Router();

router.use(checkAuth);

router.post('/table/:id/entry', async (req, res) => {
    if (!validator(req.body, 'table')) return res.status(400);
    try {
        // Checks if table exists
        let [results, fields] = await db.query("SELECT * FROM tables WHERE id = ?", req.query.params.id);
        if (results.length < 1) return res.status(404);

    } catch (e) {
        return res.status(500);
    }

    let sql = "INSERT INTO tables (";
    let params = [];

    if (req.body.company) {
        sql += "company, ";
        params += req.body.company;
    }

    if (req.body.title) {
        sql += "title, ";
        params += req.body.title;
    }

    if (req.body.application_open) {
        sql += "application_open, ";
        params += req.body.application_open;
    }

    if (req.body.application_close) {
        sql += "application_close, ";
        params += req.body.application_close;
    }

    if (req.body.application_date) {
        sql += "application_date, ";
        params += req.body.application_date;
    }

    if (req.body.status) {
        sql += "status, ";
        params += req.body.status;
    }

    if (req.body.preference) {
        sql += "preference, ";
        params += req.body.preference;
    }

    if (req.body.notes) {
        sql += "notes, ";
        params += req.body.preference;
    }

    if (params < 1) return res.status(400);
    sql.substring(0, sql.length -2);
    sql += ") VALUES (" + "?, ".repeat(params.length -1) + "?)";

    try {
        await db.query(sql, params); //TODO may return failure
        res.status(200);
    } catch (e) {
        console.log(e);
        return res.status(500);
    }

});

router.put('/table/:id/entry/:entryId', async (req, res) => {
    if (!validator(req.body, 'table')) return res.status(400);
    try {
        // Checks if table exists
        let [results, fields] = await db.query("SELECT * FROM tables WHERE id = ?", req.query.params.id);
        if (results.length < 1) return res.status(404);

        // Checks if entry exists
        [results, fields] = await db.query("SELECT * FROM entries WHERE id = ?", req.query.params.entryId);
        if (results.length < 1) return res.status(404);
    } catch (e) {
        console.log(e);
        res.status(500);
    }

    let sql = "UPDATE entries SET ";
    let params = [];

    if (req.body.company) {
        sql += "company = ? ";
        params += req.body.company;
    }

    if (req.body.title) {
        sql += "title = ? ";
        params += req.body.title;
    }

    if (req.body.application_open) {
        sql += "application_open = ? ";
        params += req.body.application_open;
    }

    if (req.body.application_close) {
        sql += "application_close = ? ";
        params += req.body.application_close;
    }

    if (req.body.application_date) {
        sql += "application_date = ? ";
        params += req.body.application_date;
    }

    if (req.body.status) {
        sql += "status = ? ";
        params += req.body.status;
    }

    if (req.body.preference) {
        sql += "preference = ? ";
        params += req.body.preference;
    }

    if (req.body.notes) {
        sql += "notes = ? ";
        params += req.body.preference;
    }

    if (params.length < 1) return res.status(400);
    sql += "WHERE id = ?";
    params += req.params.entryId;

    try {
        await db.query(sql, params); //TODO may return failure
        res.status(200);
    } catch (e) {
        return res.status(500);
    }
});

router.delete('/table/:id/entry/:entryId', async (req, res) => {
    try {
        // Checks if table exists
        let [results, fields] = await db.query("SELECT * FROM tables WHERE id = ?", req.query.params.id);
        if (results.length < 1) return res.status(404);

        // Checks if entry exists
        [results, fields] = await db.query("SELECT * FROM entries WHERE id = ?", req.query.params.entryId);
        if (results.length < 1) return res.status(404);
    } catch (e) {
        console.log(e);
        res.status(500);
    }

    await db.query('DELETE FROM entries WHERE id = ?', req.params.entryId); //TODO may return failure
    res.status(200);
});

module.exports = router;