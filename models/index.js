const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type:Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open','closed')
  }
}, {

hooks: {
  beforeValidate: function(page){

    var regex = / /g;
    const afterregex = page.title.replace(regex,"_");
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
    page.slug = slug;
  }
 }
})




const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})


module.exports = {
  db, Page, User
}
