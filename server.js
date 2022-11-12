const express=require('express')
const app= express()
const apiRoutes = require('./routes');
const PORT=process.env.PORT || 3000

app.use(logger)

app.use('/pathfinder', function(req, res, next){
	pathfinderUI(app)
	next()
}, pathfinderUI.router)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("public"))

app.use('/api', apiRoutes);

app.get("*", function(req, res){
	res.redirect('/pathfinder');
})

function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})