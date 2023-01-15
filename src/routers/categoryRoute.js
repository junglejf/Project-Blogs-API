const { Router } = require('express');

const route = Router();

const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

route.post('/', authMiddleware.validateToken, categoryController.addCategory);
route.get('/', authMiddleware.validateToken, categoryController.getAll);
module.exports = route;