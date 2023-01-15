const { Router } = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const route = Router();

route.delete('/me', authMiddleware.validateToken, userController.deleteUser);
route.get('/', authMiddleware.validateToken, userController.getAll);
route.get('/:id', authMiddleware.validateToken, userController.getUser);
route.post('/', userController.addUser);

module.exports = route;