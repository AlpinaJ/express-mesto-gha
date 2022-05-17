const routes = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
} = require("../controllers/cardControllers");

routes.get("/", getCards);
routes.delete("/:cardId", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

routes.post("/", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .pattern(/^(http(s))+[\w\-._~:/?#[\]@!$&'()*+,;=.]/),
  }),
}), createCard);
routes.put("/:cardId/likes", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

routes.delete("/:cardId/likes", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), unlikeCard);

module.exports = routes;
