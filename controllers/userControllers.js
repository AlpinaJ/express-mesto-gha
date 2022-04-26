const User = require("../models/userModel");

const DefaultErrorCode = 500;
const ErrorNotFoundCode = 404;
const ValidationErrorCode = 400;

module.exports.getUsers = (req, res) => {
  User.find({ })
    .then((users) => res.send({ data: users }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ErrorNotFoundCode).send("Пользователь по указанному _id не найден");
      } else {
        res.status(DefaultErrorCode).send("Ошибка по умолчанию");
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ValidationErrorCode).send("Переданы некорректные данные при создании пользователя");
      } else {
        res.status(DefaultErrorCode).send("Ошибка по умолчанию");
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name } = req.body;
  User.findByIdAndUpdate(req.user._id, { name }).then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ValidationErrorCode).send("Переданы некорректные данные при обновлении профиля");
      } else if (err.name === "CastError") {
        res.status(ErrorNotFoundCode).send("Пользователь по указанному _id не найден");
      } else {
        res.status(DefaultErrorCode).send("Ошибка по умолчанию");
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }).then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ValidationErrorCode).send("Переданы некорректные данные при обновлении аватара");
      } else if (err.name === "CastError") {
        res.status(ErrorNotFoundCode).send("Пользователь по указанному _id не найден");
      } else {
        res.status(DefaultErrorCode).send("Ошибка по умолчанию");
      }
    });
};
