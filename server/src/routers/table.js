const db = require('../db')
const validator = require('../schemas/validator');
const {checkAuth} = require("./auth");
const express = require('express');
const router = express.Router();

router.get('/tables', checkAuth, async (req, res) => {
    try {
        const [results, fields] = await db.query("SELECT * FROM tables WHERE user_id = ?", [req.user.id]);
        if (results.length < 1) return res.status(404).send("No tables found!");

        res.status(200).json(results);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.get('/table/:id', checkAuth, async (req, res) => {
    try {
        let [results, fields] = await db.query("SELECT * FROM tables WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]); //TODO MAY RETURN FAILURE
        if (results.length < 1) return res.status(404).send();
        let table = results[0];
        [results, fields] = await db.query("SELECT * FROM entries WHERE table_id = ?", [req.params.id]);
        results.forEach((entry, index, arr) => {
            let currDate = new Date(entry.application_open);
            entry.application_open = (currDate.getFullYear() < 10 ? ("0" + currDate.getFullYear() ) : currDate.getFullYear()) + '-' +
                                     (currDate.getMonth() < 10 ? ("0" + currDate.getMonth() + 1 ) : currDate.getMonth() + 1) + '-' +
                                     (currDate.getDate() < 10 ? ("0" + currDate.getDate() ) : currDate.getDate());

            currDate = new Date(entry.application_close);
            entry.application_close = (currDate.getFullYear() < 10 ? ("0" + currDate.getFullYear() ) : currDate.getFullYear()) + '-' +
                                      (currDate.getMonth() < 10 ? ("0" + currDate.getMonth() + 1 ) : currDate.getMonth() + 1) + '-' +
                                      (currDate.getDate() < 10 ? ("0" + currDate.getDate() ) : currDate.getDate());

            currDate = new Date(entry.application_date);
            entry.application_date = (currDate.getFullYear() < 10 ? ("0" + currDate.getFullYear() ) : currDate.getFullYear()) + '-' +
                                     (currDate.getMonth() < 10 ? ("0" + currDate.getMonth() + 1) : currDate.getMonth() + 1) + '-' +
                                     (currDate.getDate() < 10 ? ("0" + currDate.getDate() ) : currDate.getDate());
            arr[index] = entry;
        });
        res.status(200).json({
            title: table.title,
            id: table.id,
            name: table.name,
            user_id: table.user_id,
            color: table.color,
            entries: results
        });

    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.post('/table', checkAuth, async (req, res) => {
    try {
        if (!validator(req.body, 'table')) return res.status(400).send();
        const [results, fields] = await db.query("SELECT * FROM tables WHERE user_id = ?", [req.user.id]); //TODO MAY RETURN FAILURE
        if (results > 7) return res.status(400).send("Each user may only have 8 tables max!");

        let sql = "INSERT INTO tables (user_id";
        let params = [req.user.id];

        if (req.body.name) {
            sql += ", name";
            params.push(req.body.name);
        }
        if (req.body.color) {
            sql += ", color";
            params.push(req.body.color);
        }

        sql += ") VALUES (?" + " ?".repeat(params.length - 1) + ")";

        await db.query(sql, params);  //TODO MAY RETURN FAILURE
        return res.status(200).send();
    } catch (e) {
        return res.status(500).send();
    }
});

router.put('/table/:id', checkAuth, async (req, res) => {
    try {
        if (!validator(req.body, 'table')) return res.status(400).send();
        const [results, fields] = await db.query("SELECT * FROM tables WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]); //TODO MAY RETURN FAILURE
        if (results < 1) return res.status(401).send();

        let sql = "UPDATE tables SET ";
        let params = [];

        if (req.body.name) {
            sql += "name = ?, ";
            params.push(req.body.name);
        }
        if (req.body.color) {
            sql += "color = ?, ";
            params.push(req.body.color);
        }

        sql = sql.substring(0, sql.length - 2); // removes last comma
        if (params.length < 1) return res.status(400).send();
        sql += "WHERE id = ?";
        params.push(req.params.id);

        await db.query(sql, params); //TODO MAY RETURN FAILURE
        return res.status(200).send();
    } catch (e) {
        return res.status(500).send();
    }
});

router.delete('table/:id', checkAuth, async (req, res) => {
    const [results, fields] = await db.query("SELECT * FROM tables WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]);
    if (results.length < 1) return res.status(401).send();

    await db.query("DELETE FROM tables WHERE id = ?", [req.params.id]);
    return res.status(200).send();
});

module.exports = router;