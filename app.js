const express = require("express");

const mongoose = require("mongoose");

const { celebrate, Joi, errors } = require("celebrate");

const userRoutes = require("./routers/userRouter");
const cardRoutes = require("./routers/cardRouter");
const auth = require("./middlewares/auth");
const { login, createUser } = require("./controllers/userControllers");
const { errorHandler } = require("./middlewares/errorHandler");

const { PORT = 3000 } = process.env;
mongoose.connect("mongodb://localhost:27017/mestodb");
const app = express();

app.use(express.json());

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
    avatar: Joi.string().pattern(/^(http(s))+[\w\-._~:/?#[\]@!$&'()*+,;=.]/),
  }),
}), createUser);

app.use(auth);
app.use("/users", userRoutes);
app.use("/cards", cardRoutes);
app.use((req, res) => res.status(404).send({ message: "404 Not Found" }));
app.use(errors());
app.use(errorHandler);
app.listen(PORT);

// id "625aa56746411c03d82ddcdc"
