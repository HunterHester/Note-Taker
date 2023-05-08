const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

router.get("/notes", (req, res) => {
    console.info(`${req.method} request received from notes`);
    res.json(db);
});

router.post('/notes', (req, res) => {

    console.log(req.body);
    const { title, text } = req.body;

    if(title && text) {
        const newEntry = {
            title,
            text,
            id: uuidv4()
        };

        db.push(newEntry);

        const entryString = JSON.stringify(db, null, 3);

        fs.writeFile('./db/db.json', entryString, (err) => err ? console.error(err) : console.log("Entry pushed to database"));

        const response = {
            status: 'success',
            body: newEntry
        };

        console.log(response);
        res.status(201).json(response);

    } else {
        res.status(500).json('Entry creation failed!');
    }
});



module.exports = router;