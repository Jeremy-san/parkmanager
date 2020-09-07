const express = require("express");
const router = express.Router();
const connection = require("../conf");

router.get("/", (req, res) => {
    connection.query('SELECT * FROM park', (err, results) => {
        if (err) {
        res.status(500).send("Erreur lors de l'affichage des places de parkings");
        } else {
        res.json(results);
        };
    });
});