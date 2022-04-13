const router = require('express').Router();
const User = require('../models/userModel');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({data: users}))
    .catch((err) => {
      console.log(err);
    });
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({data: user}))
    .catch((err) => {
      console.log(err);
    })
}