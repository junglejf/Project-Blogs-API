const userService = require('../services/userService');

const loginService = require('../services/loginService');

const userController = {
  async addUser(req, res) { 
    const userInfo = await userService.validateUserField(req.body);
    const newUser = await userService.addUser(userInfo);
    const token = await loginService.makeToken(newUser);
    return res.status(201).json({ token });
  },

  async getAll(_req, res) {
    const users = await userService.getAll();
    return res.status(200).json(users);
  },

  async getUser(req, res) { 
    const { id } = req.params;
    const user = await userService.getUser(id);
    return res.status(200).json(user);
  },

  async deleteUser(req, res) {
    await userService.deleteUser(req.user.id);
    return res.status(204).end();
  },
};

module.exports = userController;