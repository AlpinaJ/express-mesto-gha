const User = require("../models/userModel");

const {ErrorNotFound} = require("../errors/ErrorNotFound");

const DefaultErrorCode = 500;
const ErrorNotFoundCode = 404;
const ValidationErrorCode = 400;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({data: users}));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      new ErrorNotFound("NotFoundError");
    })
    .then((user) => {
      res.send({data: user});
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ValidationErrorCode).send({message: "Пользователь по указанному _id не найден"});
      } else {
        if (err.name === "DocumentNotFoundError") {
          res.status(ErrorNotFoundCode).send({message: "Пользователь по указанному _id не найден"});
        } else {
          res.status(DefaultErrorCode).send({message: "Ошибка по умолчанию"});
        }
      }
    });
};
module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar}).then((user) => res.send({data: user}))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ValidationErrorCode).send({message: "Переданы некорректные данные при создании пользователя"});
      } else {
        res.status(DefaultErrorCode).send({message: "Ошибка по умолчанию"});
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const {name, about} = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {name, about},
    {new: true, runValidators: true},
  ).then((user) => res.status(200).send({data: user}))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ValidationErrorCode).send(
          {message: "Переданы некорректные данные при обновлении профиля"},
        );
      } else if (err.name === "CastError") {
        res.status(ErrorNotFoundCode).send(
          {message: "Пользователь по указанному _id не найден"},
        );
      } else {
        res.status(DefaultErrorCode).send({message: "Ошибка по умолчанию"});
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {avatar},
    {new: true, runValidators: true},
  ).then((user) => res.send({data: user}))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ValidationErrorCode).send({message: "Переданы некорректные данные при обновлении аватара"});
      } else if (err.name === "CastError") {
        res.status(ErrorNotFoundCode).send({message: "Пользователь по указанному _id не найден"});
      } else {
        res.status(DefaultErrorCode).send({message: "Ошибка по умолчанию"});
      }
    });
};
