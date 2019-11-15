const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout');
const main = require('./views/main');
const user = require('./routes/user.js');
const wiki = require('./routes/wiki.js')

const app = express();
const { db, Page, User } = require('./models');


app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use('/wiki', wiki)


app.get('/', async (req, res) => {
    // console.log('hello world');
    // res.redirect('/wiki');
    const wikiPages = await Page.findAll();
    // res.send(layout(""));
    res.send(main(wikiPages));
})

const init = async () => {
    await db.sync();

    app.listen(PORT, () => {
        console.log(`App listening to port ${PORT}`);
    })
}

init();

const PORT = 1337;


db.authenticate().
then(() => {
  console.log('connected to the database');
})

