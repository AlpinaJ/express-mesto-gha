const routes = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cardControllers');

routes.get('/',getCards);
routes.delete('/:cardId',deleteCard);
routes.post('/', createCard);

module.exports = routes;