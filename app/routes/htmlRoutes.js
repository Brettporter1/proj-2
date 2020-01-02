
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

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

  router.get('/amidrunk', ensureAuthenticated, (req,res) => {
      console.log('Almost there');
      res.render('am-i-drunk');
    })
module.exports = router
