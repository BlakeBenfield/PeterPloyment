const db = require('../db')
const validator = require('../schemas/validator');
const {checkAuth} = require("./auth");
const express = require('express');
const router = express.Router();

router.use(checkAuth);

router.get('/tables', async (req, res) => {
    try {
        const [results, fields] = await db.query("SELECT * FROM tables WHERE user_id = ?", [req.user.id]);
        if (results.length < 1) return res.status(404).send("No tables found!");

        res.status(200).json(results);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
});

router.get('/table/:id', async (req, res) => {
    try {
        //TODO CHECK IF USER OWNS TABLE
        let [results, fields] = await db.query("SELECT * FROM tables WHERE id = ?", [req.params.id]); //TODO MAY RETURN FAILURE
        if (results.length < 1) return res.status(404);
        let table = results[0];
        [results, fields] = await db.query("SELECT * FROM entries WHERE table_id = ?", [req.params.id]);

        res.status(200).json({
            title: table.title,
            id: table.id,
            name: table.name,
            user_id: table.user_id,
            entries: results
        });

    } catch (e) {
        console.log(e);
        res.status(500);
    }
});

router.post('/table', async (req, res) => {
    try {
        if (!validator(req.body, 'table')) return res.status(400);
        const [results, fields] = await db.query("SELECT * FROM tables WHERE user_id = ?", [req.user.id]); //TODO MAY RETURN FAILURE
        if (results > 7) return res.status(400).send("Each user may only have 8 tables max!");

        let sql = "INSERT INTO tables (user_id";
        let params = [req.user.id];

        if (req.body.name) {
            sql += ", name";
            params += req.body.name;
        }
        if (req.body.color) {
            sql += ", color";
            params += req.body.color;
        }

        sql += ") VALUES (?" + " ?".repeat(params.length - 1) + ")";

        await db.query(sql, params);  //TODO MAY RETURN FAILURE
    } catch (e) {
        return res.status(500);
    }
});

router.put('/table/:id', async (req, res) => {
    try {
        if (!validator(req.body, 'table')) return res.status(400);
        const [results, fields] = await db.query("SELECT * FROM tables WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]); //TODO MAY RETURN FAILURE
        if (results < 1) return res.status(401);

        let sql = "UPDATE tables SET";
        let params = [];

        if (req.body.name) {
            sql += "name = ?";
            params += req.body.name;
        }
        if (req.body.color) {
            sql += "color = ?";
            params += req.body.color;
        }
        if (params.length < 1) return res.status(400);

        sql += "WHERE id = ?";
        params += req.params.id;

        await db.query(sql, params); //TODO MAY RETURN FAILURE
    } catch (e) {
        return res.status(500);
    }
});

router.delete('table/:id', async (req, res) => {
    const [results, fields] = await db.query("SELECT * FROM tables WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]);
    if (results.length < 1) return res.status(401);

    await db.query("DELETE FROM tables WHERE id = ?", [req.params.id]);
});

module.exports = router;