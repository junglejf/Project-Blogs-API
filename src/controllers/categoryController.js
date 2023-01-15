const categoryService = require('../services/categoryService');

const categoryController = {
  async addCategory(req, res) { 
    const categoryName = await categoryService.validateBodyName(req.body);
    const category = await categoryService.addCategory(categoryName);
    return res.status(201).json(category);
  },

  async getAll(_req, res) {
    const categories = await categoryService.getAll();
    return res.status(200).json(categories);
  },

};

module.exports = categoryController;