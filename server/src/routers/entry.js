const {checkAuth} = require("./auth");
const db = require('../db')
const validator = require('../schemas/validator');
const express = require('express');
const router = express.Router();

router.post('/table/:id/entry', checkAuth, async (req, res) => {
    if (!validator(req.body, 'entry')) return res.status(400).send();
    try {
        // Checks if table exists
        let [results, fields] = await db.query("SELECT * FROM tables WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]);
        if (results.length < 1) return res.status(404).send();

    } catch (e) {
        console.log(e);
        return res.status(500).send();
    }

    let sql = "INSERT INTO entries (";
    let params = [];

    if (req.body.table_id) {
        sql += "table_id, ";
        params.push(req.body.table_id);
    }

    if (Object.hasOwn(req.body, "company")) {
        sql += "company, ";
        params.push(req.body.company);
    }

    if (Object.hasOwn(req.body, "title")) {
        sql += "title, ";
        params.push(req.body.title);
    }

    if (Object.hasOwn(req.body, "application_open")) {
        sql += "application_open, ";
        let str = req.body.application_open;
        params.push(str.substring(6,10) + '-' + str.substring(0,2) + '-' + str.substring(3,5));
    }

    if (Object.hasOwn(req.body, "application_close")) {
        sql += "application_close, ";
        let str = req.body.application_close;
        params.push(str.substring(6,10) + '-' + str.substring(0,2) + '-' + str.substring(3,5));
    }

    if (Object.hasOwn(req.body, "application_date")) {
        sql += "application_date, ";
        let str = req.body.application_date;
        params.push(str.substring(6,10) + '-' + str.substring(0,2) + '-' + str.substring(3,5));
    }

    if (Object.hasOwn(req.body, "status")) {
        sql += "status, ";
        params.push(req.body.status);
    }

    if (Object.hasOwn(req.body, "preference")) {
        sql += "preference, ";
        params.push(req.body.preference);
    }

    if (Object.hasOwn(req.body, "notes")) {
        sql += "notes, ";
        params.push(req.body.preference);
    }

    if (params < 1) return res.status(400).send();
    sql = sql.substring(0, sql.length -2);
    sql += ") VALUES (" + "?, ".repeat(params.length -1) + "?)";

    try {
        const response = await db.query(sql, params); //TODO may return failure
        res.status(200).send();
    } catch (e) {
        console.log(e);
        return res.status(500).send();
    }

});

router.put('/table/:id/entry/:entryId', checkAuth, async (req, res) => {
    if (!validator(req.body, 'entry')) return res.status(400).send();
    try {
        // Checks if table exists
        let [results, fields] = await db.query("SELECT * FROM tables WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]);
        if (results.length < 1) return res.status(404).send();

        // Checks if entry exists
        [results, fields] = await db.query("SELECT * FROM entries WHERE id = ?", [req.params.entryId]);
        if (results.length < 1) return res.status(404).send();

    } catch (e) {
        console.log(e);
        res.status(500).send();
    }

    let sql = "UPDATE entries SET ";
    let params = [];

    if (Object.hasOwn(req.body, "company")) {
        sql += "company = ?, ";
        params.push(req.body.company);
    }

    if (Object.hasOwn(req.body, "title")) {
        sql += "title = ?, ";
        params.push(req.body.title);
    }

    if (Object.hasOwn(req.body, "application_open")) {
        sql += "application_open = ?, ";
        params.push(req.body.application_open);
    }

    if (Object.hasOwn(req.body, "application_close")) {
        sql += "application_close = ?, ";
        params.push(req.body.application_close);
    }

    if (Object.hasOwn(req.body, "application_date")) {
        sql += "application_date = ?, ";
        params.push(req.body.application_date);
    }

    if (Object.hasOwn(req.body, "status")) {
        sql += "status = ?, ";
        params.push(req.body.status);
    }

    if (Object.hasOwn(req.body, "preference")) {
        sql += "preference = ?, ";
        params.push(req.body.preference);
    }

    if (Object.hasOwn(req.body, "notes")) {
        sql += "notes = ?, ";
        params.push(req.body.notes);
    }

    sql = sql.substring(0, sql.length - 2); // removes last comma
    if (params.length < 1) return res.status(400).send();
    sql += " WHERE id = ?";
    params.push(req.params.entryId);

    try {
        await db.query(sql, params); //TODO may return failure
        res.status(200).send();
    } catch (e) {
        console.log(e);
        return res.status(500).send();
    }
});

router.delete('/table/:id/entry/:entryId', checkAuth, async (req, res) => {
    try {
        // Checks if table exists
        let [results, fields] = await db.query("SELECT * FROM tables WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]);
        if (results.length < 1) return res.status(404).send();

        // Checks if entry exists
        [results, fields] = await db.query("SELECT * FROM entries WHERE id = ?", [req.params.entryId]);
        if (results.length < 1) return res.status(404).send();

    } catch (e) {
        console.log(e);
        res.status(500).send();
    }

    await db.query('DELETE FROM entries WHERE id = ?', [req.params.entryId]); //TODO may return failure
    res.status(200).send();
});

module.exports = router;