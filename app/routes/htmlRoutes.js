// var db = require("../models");
const path = require('path')

const express = require('express');
const router = express.Router();


  // Load index page
  router.get('/', (req, res) => {
    res.render('index')
  });

  router.get('/login', (req, res) => {
    res.render(path.join(__dirname,'..','login'));
  })

  router.get('/register', (req, res) => {
    res.render(path.join(__dirname,'..','register'));
  })

module.exports = router
