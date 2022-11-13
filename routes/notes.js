const notes=require("express").Router();
const uuid=require('./helpers/uuid')
const fs=require("fs");

notes.get("/", (req, res) => {
    fs.readFile('./db/db.json', { encoding: 'utf8' }, (err, db) => {
        res.json(JSON.parse(db));
    });
});

notes.post('/', (req, res) => {
    fs.readFile('./db/db.json', { encoding: 'utf8' }, (err, db) => {
        const db_json=JSON.parse(db);
        const { title, text }=req.body;
        const new_note={
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
    fs.readFile('./db/notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let parsedNotes=JSON.parse(data);
            let deletedNote=parsedNotes.filter(note => note.note_id === req.params.id)[0]
            let updatedNotes=parsedNotes.filter(note => note !== deletedNote)
            fs.writeFile('./db/notes.json', JSON.stringify(updatedNotes), (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Success!')
                }
            })
            res.json('Deleted Successfully!');
        }
    })
})





module.exports = notes;