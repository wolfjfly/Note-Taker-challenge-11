const express=require('express')
const app= express()
const PORT=process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

app.use(logger)

g_api(app)
p_api(app)

function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})