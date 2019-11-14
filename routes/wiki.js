const wiki = require('express').Router();

//ROUTES

wiki.get('/', (req, res, next) => {
    res.send('got to GET /wiki/')
})

wiki.post('/', (req, res, next) => {
    res.send('got to POST /wiki/')
})

wiki.get('/add', (req, res, next) => {
    res.send('got to GET /wiki/add')
})


module.exports = wiki;