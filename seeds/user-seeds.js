const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'alesmonde0',
    dogname: 'sparky',
    dogbreed: 'poodle',
    email: 'nwestnedge0@cbc.ca',
    password: 'password123'
  },
  {
    username: 'jwilloughway1',
    dogname: 'sparky',
    dogbreed: 'poodle',
    email: 'rmebes1@sogou.com',
    password: 'password123'
  },
  {
    username: 'iboddam2',
    dogname: 'sparky',
    dogbreed: 'poodle',
    email: 'cstoneman2@last.fm',
    password: 'password123'
  },
  {
    username: 'dstanmer3',
    dogname: 'sparky',
    dogbreed: 'poodle',
    email: 'ihellier3@goo.ne.jp',
    password: 'password123'
  },
  {
    username: 'djiri4',
    dogname: 'sparky',
    dogbreed: 'poodle',
    email: 'gmidgley4@weather.com',
    password: 'password123'
  },
  {
    username: 'msprague5',
    dogname: 'sparky',
    dogbreed: 'poodle',
    email: 'larnout5@imdb.com',
    password: 'password123'
  },
  {
    username: 'mpergens6',
    dogname: 'sparky',
    dogbreed: 'poodle',
    email: 'hnapleton6@feedburner.com',
    password: 'password123'
  },
  {
    username: 'tpenniell7',
    dogname: 'sparky',
    dogbreed: 'poodle',
    email: 'kperigo7@china.com.cn',
    password: 'password123'
  },
  {
    username: 'msabbins8',
    dogname: 'sparky',
    dogbreed: 'poodle',
    email: 'lmongain8@google.ru',
    password: 'password123'
  },
  {
    username: 'jmacarthur9',
    dogname: 'sparky',
    dogbreed: 'poodle',
    email: 'bsteen9@epa.gov',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
