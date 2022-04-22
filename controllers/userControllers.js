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

module.exports.createUser = (req, res)=>{
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar}).then(user=> res.send({data:user}))
    .catch(err=> console.log(err));
}