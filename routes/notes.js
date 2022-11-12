const notes = require("express").Router();
const fs = require("fs");
const { readAndAppend, readFromFile, writeToFile } = require("../helpers/util");
const uuid = require("../helpers/uuid");

notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data)=> res.json(JSON.parse(data)))
});

notes.post("/", (req, res) => {
    const { title, text} = req.body;

    if(title && text){
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        console.log(newNote);
        readAndAppend(newNote, "./db/db.json");
        res.json("A new note has been added!")
    } else {
        res.errored("Error in adding a new note!")
    }
});

notes.delete("/:id", (req, res) => {

    fs.readFile("./db/db.json", "utf8", (err, notes) => {
        if(err) {
            console.log(err);
        }
        else{
            const data = JSON.parse(notes);
            const newNotes = data.filter(note => note.id !== req.params.id);
            writeToFile("./db/db.json", newNotes);
            res.json("The note has been deleted!");
        }
    })
})

module.exports = notes;