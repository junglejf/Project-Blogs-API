const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const { throwUnauthorizedError } = require('../helpers/throwError');

const loginService = require('../services/loginService');

const validateToken = async (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throwUnauthorizedError('Token not found');

  try {
      const payload = jwt.verify(token, JWT_SECRET);

      const user = await loginService.validateUser(payload.data);
      if (!user) throwUnauthorizedError('Expired or invalid token');
      req.user = user;
      next();
    } catch (err) {
      throwUnauthorizedError('Expired or invalid token');
    }
};

module.exports = { 
  validateToken,
};