const Joi = require('joi');
const { Category } = require('../database/models');

const categoryController = {
  async validateBodyName(body) {
    const schema = Joi.object({
      name: Joi.string().required().messages({ 'string.empty': '"name" is required' }),
    }); 

    const result = await schema.validateAsync(body);
    return result;
  },

  async addCategory(category) { 
    console.log('category', category);
    const response = await Category.create(category);
    return response;
  },

  async getAll() {
    const response = await Category.findAll(); 
    return response;
  },
};

module.exports = categoryController;