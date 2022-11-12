const express=require('express')
const path = require('path');
const app= express()
const apiRoutes = require('./routes/index.js');
const PORT=process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', apiRoutes);
app.use(express.static("public"))



// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get("/notes", (req, res) =>
res.sendFile(path.join(__dirname, "/public/notes.html"))
);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})