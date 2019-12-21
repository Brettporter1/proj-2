// var db = require("../models");
const path = require('path')

const express = require('express');
const router = express.Router();


  // Load index page
  router.get('/', (req, res) => {
    res.render('index')
  });

  router.get('/login', (req, res) => {
    res.render('login');
  })

  router.get('/register', (req, res) => {
    res.render('register');
  });

  router.get('/amidrunk', (req, res) => {
    res.render('am-i-drunk')
  })

module.exports = router
