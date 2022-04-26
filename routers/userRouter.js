const routes = require("express").Router();
const {
  getUsers, getUserById, createUser, updateProfile, updateAvatar,
} = require("../controllers/userControllers");

routes.get("/", getUsers);
routes.get("/:userId", getUserById);
routes.post("/", createUser);
routes.patch("/me", updateProfile);
routes.patch("/me/avatar", updateAvatar);

module.exports = routes;
