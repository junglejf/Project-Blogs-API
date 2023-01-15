const errors = {
  ValidationError: 400,
  UnauthorizedError: 401,
  NotFoundError: 400,
  UserAlreadyRegistered: 409,
  DoenstExist: 404,
};

/**
 * @param {Error} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */

const errorMiddleware = (error, _req, res, _next) => {
  const { name, message } = error; 
  const status = errors[name];
  if (!status) return res.sendStatus(500);
  res.status(status).json({ message });
};

module.exports = errorMiddleware;

// estrutura baseada na aula 24.3 tribo-19-b