var db = require("../models");
const express = require('express');
const router = express.Router();

// Get all users
router.get("/api/users", function (req, res) {
  db.User.findAll({}).then(function (data) {
    res.json(data);
  });
});

// Post new user form
router.post("/api/users", function (req, res) {
  db.User.create(req.body).then(function (data) {
    res.json(data);
  });
});

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