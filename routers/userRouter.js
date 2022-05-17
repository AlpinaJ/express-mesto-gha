const routes = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUsers, getUserById, updateProfile, updateAvatar, getCurrentUser,
} = require("../controllers/userControllers");

routes.get("/", getUsers);
routes.get("/me", getCurrentUser);
routes.get("/:userId", celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

// routes.post("/", createUser);
routes.patch("/me", celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
routes.patch("/me/avatar", celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^(http(s))+[\w\-._~:/?#[\]@!$&'()*+,;=.]/).required(),
  }),
}), updateAvatar);

module.exports = routes;
