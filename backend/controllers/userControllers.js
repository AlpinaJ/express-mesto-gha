const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {ErrorNotFound} = require("../errors/ErrorNotFound");
const {ValidationError} = require("../errors/ValidationError");
const {UnauthorizedError} = require("../errors/UnauthorizedError");
const {ConflictError} = require("../errors/ConflictError");
const JWT_KEY = 'jwt';
const JWT_OPTIONS = {
  maxAge: 604800,
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  domain: '.mesto-julia.nomoredomains.work',
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({data: users})).catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({data: user});
      } else {
        next(new ErrorNotFound("Пользователь по указанному _id не найден"));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ValidationError("Переданы некорректные данные"));
      } else {
        next(err);
      }
    });
};
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!validator.isEmail(email)) {
    next(new ValidationError("Переданы некорректные данные"));
  }

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    }).then((user) => {
      res.send({
        data: {
          email: user.email,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        },
      })
    })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError("Пользователь с таким EMAIL уже зарегистрирован"));
        } else if (err.name === "ValidationError") {
          next(new ValidationError("Переданы некорректные данные при создании пользователя"));
        } else {
          next(err);
        }
      });
  }).catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  console.log("update profile");
  const {name, about} = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {name, about},
    {new: true, runValidators: true},
  ).then((user) => res.status(200).send({data: user}))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError("Переданы некорректные данные при обновлении профиля"));
      } else if (err.name === "CastError") {
        next(new ErrorNotFound("Пользователь по указанному _id не найден"));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {avatar},
    {new: true, runValidators: true},
  ).then((user) => res.send({data: user}))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError("Переданы некорректные данные при обновлении аватара"));
      } else if (err.name === "CastError") {
        next(new ErrorNotFound("Пользователь по указанному _id не найден"));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const {email, password} = req.body;
  console.log("login with ", email);
  return User.findOne({email}).select("+password")
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError("Неправильные почта или пароль"));
      } else {
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            const token = jwt.sign({_id: user._id}, "some-secret-key", {expiresIn: "7d"});
            res.cookie(JWT_KEY, token, JWT_OPTIONS);
            res.status(200).send({message: "success"});
          } else {
            next(new UnauthorizedError("Неправильные почта или пароль"));
          }
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.logout = (req, res, next) => {
  console.log("logout");
  res.clearCookie(JWT_KEY, JWT_OPTIONS);
  res.end();
}

module.exports.getCurrentUser = (req, res, next) => {
  console.log("getCurrentUser", req.user);
  User.findById(req.user._id).then((user) => {
    console.log(user);
    res.send({data: user})
    }
  )
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ValidationError("Невалидный id"));
      } else if (err.name === "CastError") {
        next(new ErrorNotFound("Пользователь по указанному _id не найден"));
      } else {
        next(err);
      }
    });
};
