const express = require('express');
const app = express();
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
require('dotenv').config();

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions


app.get('/', function (req, res) {

  res.send('Welcome to Passport with Sequelize');

});


//Models
const models = require("./app/models/");

const authRoute = require('./app/routes/auth.js')(app);


//Sync Database
models.sequelize.sync({ force: true }).then(function () {
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
app.set('views', './app/views')
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', '.handlebars');


