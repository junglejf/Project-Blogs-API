const postService = require('../services/postService');

const postController = {
  async addPost(req, res) {
    const postInfo = await postService.validateBodyPost(req.body);
    const post = await postService.addPost(req.user.id, postInfo);
    res.status(201).json(post);
  },
  async getAll(_req, res) {
    const posts = await postService.getAll();
    return res.status(200).json(posts);
  },
  async getPost(req, res) {
    const { id } = req.params;
    const post = await postService.getPost(id);
    return res.status(200).json(post);
  },
  async updatePost(req, res) {
    const { user, params: { id } } = req;
    const postInfo = await postService.validateBodyUpdatePost(req.body);
    const post = await postService.updatePost(id, user.id, postInfo);
    return res.status(200).json(post);
  },
  async deletePost(req, res) {
    const { user, params: { id } } = req;
    await postService.deletePost(id, user.id);
    return res.status(204).end();
  },

  async searchPost(req, res) {
     const post = await postService.searchPost(req.query.q);
     return res.status(200).json(post);
  },
};

module.exports = postController;