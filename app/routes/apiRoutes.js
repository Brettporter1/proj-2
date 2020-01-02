const db = require("../models/index");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { User } = require('../models');
const passport = require('passport');

// Get all users
router.get("/api/users", function (req, res) {
  db.User.findAll({}).then(function (data) {
    res.json(data);
  });
});

// Post new user form
router.post("/register", (req, res) => {
  const {name, email, weight, height, gender, password, password2} = req.body;
  let errors = [];

  if(!name || !email || !weight || !gender || !password || !password2) {
    errors.push({ msg:'Please fill in all fields' });
  }

  if(password !== password2) {
    errors.push({ msg:'Passwords don\'t match' });
  }

  if(password.length < 6){
    errors.push({ msg:'Password should be at least 6 characters' });
  }
  if (errors.length > 0){
    res.render('register', {
      errors, 
      name,
      email,
      weight,
      height,
      gender,
      password,
      password2
    })
  }else{
    console.log(User, name, email, password);
    User.findOne({
      where:{
        email: email
      }
      })
      .then( user => {
        if(user){
          errors.push({msg:'This Email has already been registered'})
          res.render('register', {
            errors, 
            name,
            email,
            weight,
            height,
            gender,
            password,
            password2
          })
        }else{
          const newUser = new User({
            name,
            email,
            password,
            weight,
            height,
            gender
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  res.redirect('/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      })
    // User.create(req.body).then(function (data) {
    //   res.json(data);
    // });
  }
  
});

router.post('/login', (req, res, next) => {
  console.log('trying to login');
  passport.authenticate('local', {
    successRedirect:'/amidrunk',
    failerRedirect:'/login',
  })(req, res, next);
  console.log('made it here')
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
})

router.get("/api/amidrunk", function (req, res) {
  db.Form.findAll({}).then(function (data) {
    res.json(data);
  });
});

router.post("/api/amidrunk", function (req, res) {
  db.Form.create(req.body).then(function (data) {
    res.json(data);
  });
});

module.exports = router;