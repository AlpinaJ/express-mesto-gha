const routes = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, unlikeCard } = require('../controllers/cardControllers');

routes.get('/',getCards);
routes.delete('/:cardId',deleteCard);
routes.post('/', createCard);
routes.put('/:cardId/likes', likeCard);
routes.delete('/:cardId/likes', unlikeCard);

module.exports = routes;