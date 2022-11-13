// import { unlink } from 'node:fs'
const fsExtra = require('fs-extra')
const notes = require("express").Router();
const uuid = require('./helpers/uuid')

const fs = require("fs");

notes.get("/", (req, res) => {
    fs.readFile('./db/db.json', { encoding: 'utf8' }, (err, db) => {
        res.json(JSON.parse(db));
    });
});

notes.post('/', (req, res) => {
    fs.readFile('./db/db.json', { encoding: 'utf8' }, (err, db) => {
        const db_json = JSON.parse(db);
        const { title, text } = req.body;
        const new_note = {
            id: uuid(),
            title: title,
            text: text
        }
        db_json.push(new_note);
        fs.writeFile('./db/db.json', JSON.stringify(db_json), (err) => {
            res.send(err ? err : 'save success');
        });
    });
});

notes.delete('/:id', (req, res) => {
    const note_id = req.params.id;
    // Read the JSON "database" file and parse it.
    fs.readFile('./db/db.json', { encoding: 'utf8' }, (err, db) => {
        if (!err) {
            const db_json = JSON.parse(db);
            // Filter the list so that it no longer includes
            // the chosen note.
            const new_db = db_json.filter(e => e.id !== note_id);
            // Write the modified array to the "database" file.
            fs.writeFile('./db/db.json', JSON.stringify(new_db), (err) => {
                err ? console.error(err) : console.info('delete success');
            });
            // Return the new "database" JSON array as part of the response.
            // (From what I can tell, the app doesn't do anything with this,
            // but I designed this in an analogous way to the POST request
            // for consistency.)
            const response = {
                status: 'success',
                body: new_db
            };
            res.status(204).json(response);
        } else {
            res.status(500).json('Error in deleting note.');
        }
    });
});



module.exports = notes;