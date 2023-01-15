const Joi = require('joi');
const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../database/models');
const { 
  throwNotFoundError, 
  throwDoesntExistError, 
  throwUnauthorizedError } = require('../helpers/throwError');

const missingField = { 'string.empty': 'Some required fields are missing' };

const postService = {
  async validateBodyPost(body) {
    const schema = Joi.object({
      title: Joi.string().required().messages(missingField),
      content: Joi.string().required().messages(missingField),
      categoryIds: Joi.array().items(Joi.number()).required().messages(missingField),
    }); 
    
    const result = await schema.validateAsync(body);
    
    return result; 
  },

  async validateBodyUpdatePost(body) {
    const schema = Joi.object({
      title: Joi.string().required().messages(missingField),
      content: Joi.string().required().messages(missingField),
    }); 
    
    const result = await schema.validateAsync(body);
    return result; 
  },

  async addPost(userId, postInfo) {
    const { title, content, categoryIds } = postInfo; 
    const categoriesResponse = await Category.findAll({ attributes: ['id'] });
    const categories = await categoriesResponse.map((category) => category.dataValues.id);
    
    const postCategoriesExist = categoryIds.every((id) => categories.includes(id));
    if (!postCategoriesExist) throwNotFoundError('"categoryIds" not found');
    
    const blogPost = await BlogPost.create({ title, content, userId });

    const lines = categoryIds.map((categoryId) => ({ categoryId, postId: blogPost.id }));
    await PostCategory.bulkCreate(lines);

    return blogPost;
  },

  async getAll() {
    const posts = await BlogPost.findAll({ include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' }],
      });
    return posts;
  },

  async getPost(id) {
    const post = await BlogPost.findByPk(id, { include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });
    if (!post) throwDoesntExistError('Post does not exist');
    return post;
  },

  async updatePost(id, userId, postInfo) {
    const post = await BlogPost.findByPk(id);
    if (!post) throwDoesntExistError('Post does not exist');
    if (post.dataValues.userId !== userId) throwUnauthorizedError('Unauthorized user');
    await BlogPost.update(postInfo, { where: { id } });
    const updatedPost = await postService.getPost(id);
    return updatedPost;
  },

  async deletePost(id, userId) {
    const post = await BlogPost.findByPk(id);
    if (!post) throwDoesntExistError('Post does not exist');
    if (post.dataValues.userId !== userId) throwUnauthorizedError('Unauthorized user');
    await PostCategory.destroy({ where: { postId: id } });
  },

  // lembrete: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
  async searchPost(word) { 
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
      where: {
        [Op.or]: {
           content: { [Op.like]: `%${word}%` },
           title: { [Op.like]: `%${word}%` },
        },
      },

    });
    return posts;
  },
};

module.exports = postService;