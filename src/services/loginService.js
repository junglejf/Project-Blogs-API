const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const { throwNotFoundError } = require('../helpers/throwError');

const secret = process.env.JWT_SECRET || 'admin';
const missingField = { 'string.empty': 'Some required fields are missing' };

const loginService = {

  async validateBodyLogin(body) {
    const schema = Joi.object({
      email: Joi.string().required().email().messages(missingField),
      password: Joi.string().required().messages(missingField),
    }); 

    const result = await schema.validateAsync(body);
    return result;
  },

  async validateUser(userInfo) {
    const user = await User.findOne({ where: { email: userInfo.email } });
    
    const userNotFound = !user || user.password !== userInfo.password;
    if (userNotFound) throwNotFoundError('Invalid fields');

    return user; 
  },

  async makeToken(user) {
    const token = jwt.sign({ data: user }, secret);
    return token;
  },

};

module.exports = loginService;