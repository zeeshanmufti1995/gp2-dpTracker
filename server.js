const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const session = require('express-session');
// const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;
<<<<<<< HEAD
=======

// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({ helpers });

const SequelizeStore = require('connect-session-sequelize')(session.Store);
>>>>>>> beb0d03bf0c4e225c508e6d549ba2b53a64517ba

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
<<<<<<< HEAD
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
=======
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
>>>>>>> beb0d03bf0c4e225c508e6d549ba2b53a64517ba

