const Joi = require('joi');

const { User } = require('../database/models');

const { throwUserAlreadyRegistered, throwDoesntExistError } = require('../helpers/throwError');

const userService = {
  async validateUserField(body) {
    const schema = Joi.object({
      displayName: Joi.string().min(8).required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
      image: Joi.string().required(),
    }); 

    const result = await schema.validateAsync(body);
    return result;
  }, 

  async addUser(user) {
    const userExist = await User.findOne({ where: { email: user.email } });
    if (userExist) throwUserAlreadyRegistered();
    const newUser = await User.create(user);
    return newUser.toJSON;
  },

  async getAll() {
    // https://stackoverflow.com/questions/31679838/sequelizejs-findall-exclude-field
    const response = await User.findAll({ attributes: { exclude: ['password'] } }); 
    return response;
  },

  async getUser(id) {
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!user) throwDoesntExistError();
    return user;
  },

  async deleteUser(id) {
    await User.destroy({ where: { id } });
  },
};

module.exports = userService;