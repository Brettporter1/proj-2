
const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

require('dotenv').config();
const app = express();


// app.use(bodyParser.json());
app.use(express.static("./app/public"));

//load passport strategies
require('./app/config/passport/passport')(passport);

// For Handlebars
app.set('views', './app/views')
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', '.handlebars');

//Models
const models = require("./app/models/");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express Session
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret

// For Passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Connect Flash
app.use(flash());


// connect to html routes to render pages

const htmlRoutes = require('./app/routes/htmlRoutes');
app.use(htmlRoutes);

const apiRoutes = require("./app/routes/apiRoutes");
app.use(apiRoutes);

//Sync Database
const PORT = process.env.PORT || 5000;

models.sequelize.sync({  }).then(function () {
  app.listen(PORT, err => {
    if (!err)
      console.log("Site is live");
    else console.log(err)

  });
  console.log('Nice! Database looks fine')

}).catch(function (err) {

  console.log(err, "Something went wrong with the Database Update!")

});

module.exports = app;
