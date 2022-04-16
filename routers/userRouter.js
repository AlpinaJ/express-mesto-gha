const routes = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/userControllers');

routes.get('/',getUsers);
routes.get('/:userId',getUserById);
routes.post('/', createUser);

module.exports = routes;