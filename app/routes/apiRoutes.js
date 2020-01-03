const db = require("../models/index");
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { User } = require('../models');
const { Form } = require('../models')
const passport = require('passport');

// Get all users
router.get("/api/users", function (req, res) {
  db.User.findAll({}).then(function (data) {
    res.json(data);
  });
});

// Post new user form
router.post("/register", (req, res) => {
  const { name, email, weight, height, gender, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !weight || !gender || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords don\'t match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }
  if (errors.length > 0) {
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
  } else {
    console.log(User, name, email, password);
    User.findOne({
      where: {
        email: email
      }
    })
      .then(user => {
        if (user) {
          errors.push({ msg: 'This Email has already been registered' })
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
        } else {
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
    successRedirect: '/amidrunk',
    failerRedirect: '/login',
  })(req, res, next);
  console.log('made it here')
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
})

router.get('/amidrunk', async (req, res) => {
  const drink = await Form.findAll({
    where: {
      UserId: req.session.passport.user
    }
  })
  console.log(drink);
  res.render('am-i-drunk', { drink });
});

router.post('/amidrunk', async (req, res) => {
  let { quantity, alc_percentage, type, hours } = req.body;
  let UserId = req.session.passport.user;
  const drink = await Form.create({
    quantity,
    alc_percentage,
    type,
    hours,
    UserId
  })

  let weight = parseFloat(req.user.weight);
  let gender = req.user.gender;
  let drinks = parseFloat(drink.quantity);
  let percentage = parseFloat(drink.alc_percentage) / 100;
  let drinkinghours = parseFloat(drink.hours);
  const BAC = (weight, gender, drinks, hours) => {

    let distribution;
    if (gender === "Female") {
      distribution = 0.66;
    } else {
      distribution = 0.73;
    }
    let totalAlc = drinks * percentage;
    let BAC = (Number(((totalAlc * 5.14) / (weight * distribution)) - 0.015 * hours)).toFixed(2);
    console.log(BAC);
    return BAC
  }
  let alcLevel = BAC(weight, gender, drinks, drinkinghours);
  console.log(typeof alcLevel);
  // console.log(`this is my drink: ${BAC(weight, gender, drinks, drinkinghours)}`)
  res.render('am-i-drunk', {alcLevel});
});

router.delete('/amidrunk:createdAt', async (req, res) => {
  const currentTime = new Date();
  const drink = await Form.destroy({
    where: {
      createdAt: { $lt: currentTime.setHours(currentTime.getHours() - 5) }
    }
  })
})
module.exports = router;