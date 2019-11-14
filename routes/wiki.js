const wiki = require('express').Router();
const addPage = require('../views/addPage.js');
const { Page } = require("../models");
const wikiPage = require('../views/wikipage.js');

//ROUTES

wiki.get('/', (req, res, next) => {
    res.redirect('/');
    res.send('got to GET /wiki/')
})


wiki.get('/add', (req, res, next) => {
    res.send(addPage())
})


wiki.get('/:slug', async (req, res, next) => {

    try{
    const findWikiPage = await Page.findOne({
        where: { 
            slug: req.params.slug 
        }
    })

    const author = '';
    console.log('findWikiPage:', findWikiPage); //returns null
    res.send(wikiPage(findWikiPage, author));
    }

    catch(error) {
        next(error)
    }

  });



wiki.post('/', async (req, res, next) => {

var regex = / /g;
const afterregex = req.body.title.replace(regex,"_");
var regex2 = /[^a-zA-Z0-9_]/g;
var slug = afterregex.replace(regex2,"");

function randomStr(len,arr) {
    var str = '';
    for (let i = 0; i < arr.length; i++) {
        str += arr[Math.floor(Math.random()*arr.length)]
    }
    return str;
}
const arr = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
if (slug === "") {
    slug = randomStr(10,arr);
}
console.log("slug: ",slug);
const page = new Page({
    title: req.body.title,
    content: req.body.content,
    slug: `/wiki/${slug}`
})

console.log('new page instance:', page);

try {
    await page.save();
    res.redirect(`/wiki/${slug}`);
} catch (error) { next(error) }
})


module.exports = wiki;
