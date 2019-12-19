require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");

const db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
const htmlRoutes = require('./app/routes/htmlRoutes');
app.use(htmlRoutes);

module.exports = app;
