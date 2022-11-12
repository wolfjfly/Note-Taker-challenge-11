const router = require('express').Router();
const fs = require("fs");

router.post('/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
    } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
    }
});







module.exports = router;