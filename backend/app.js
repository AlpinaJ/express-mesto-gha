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

const {PORT = 3000} = process.env;
mongoose.connect("mongodb://localhost:27017/mestodb");
const app = express();

require('dotenv').config();
console.log(process.env.NODE_ENV);

app.use(express.json());
const corsOptions = {
  origin: ['https://mesto-julia.nomoredomains.xyz','http://mesto-julia.nomoredomains.xyz', 'http://localhost:3000'],
  credentials: true,
};

app.use(cors(corsOptions));


app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

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

app.use(auth);
app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

app.use((req, res, next) => {
  next(new ErrorNotFound("Страница не найдена"))
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

console.log(1);
app.listen(PORT);

// id "625aa56746411c03d82ddcdc"
