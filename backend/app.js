const express = require("express");

const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

const {celebrate, Joi, errors} = require("celebrate");

const cors = require('cors');

const userRoutes = require("./routers/userRouter");
const cardRoutes = require("./routers/cardRouter");
const {auth} = require("./middlewares/auth");
const {login, createUser, logout} = require("./controllers/userControllers");
const {errorHandler} = require("./middlewares/errorHandler");

const {ErrorNotFound} = require("./errors/ErrorNotFound");
const {requestLogger, errorLogger} = require('./middlewares/logger');

const allowedCors = [
  'https://mesto-julia.nomoredomains.xyz',
  'http://localhost:3001',
  'http://mesto-julia.nomoredomains.xyz',
  'https://localhost:3001'
];


const {PORT = 3000} = process.env;
mongoose.connect("mongodb://localhost:27017/mestodb");
const app = express();

app.use(express.json());
app.use(function(req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
});

app.use(cookieParser());
app.use(requestLogger);


app.post("/signin", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post("/signup", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/),
  }),
}), createUser);
app.post('/signout', logout);

// app.use(auth);
// app.use("/users", userRoutes);
// app.use("/cards", cardRoutes);

app.use((req, res, next) => {
  next(new ErrorNotFound("Страница не найдена"))
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

console.log(PORT);
app.listen(PORT);

// id "625aa56746411c03d82ddcdc"
