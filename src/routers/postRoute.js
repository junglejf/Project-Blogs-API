const { Router } = require('express');
const postController = require('../controllers/postController');

const route = Router();
const authMiddleware = require('../middlewares/authMiddleware');

route.get('/search', authMiddleware.validateToken, postController.searchPost);
route.delete('/:id', authMiddleware.validateToken, postController.deletePost);
route.put('/:id', authMiddleware.validateToken, postController.updatePost);
route.post('/', authMiddleware.validateToken, postController.addPost);
route.get('/', authMiddleware.validateToken, postController.getAll);
route.get('/:id', authMiddleware.validateToken, postController.getPost);

module.exports = route;