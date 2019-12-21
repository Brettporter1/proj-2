
const express = require('express');
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
require('dotenv').config();

const app = express();

app.set('views', './app/views')
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', '.handlebars');

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("app/public"));
// For Passport

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

//Models
const models = require("./app/models/");

// Routes

// connect to html routes to render pages

const htmlRoutes = require('./app/routes/htmlRoutes');
app.use(htmlRoutes);

const apiRoutes = require("./app/routes/apiRoutes");
app.use(apiRoutes);

require('./app/routes/auth.js')(app,passport);


//load passport strategies
 
require('./app/config/passport/passport.js')(passport, models.user);


//Sync Database

models.sequelize.sync({ }).then(function () {
  app.listen(5000, function (err) {
    if (!err)
      console.log("Site is live");
    else console.log(err)

  });
  console.log('Nice! Database looks fine')

}).catch(function (err) {

  console.log(err, "Something went wrong with the Database Update!")

});

//For Handlebars


module.exports = app;
