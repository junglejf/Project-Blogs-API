const throwNotFoundError = (message) => {
  const err = new Error(message);
  err.name = 'NotFoundError';
  throw err;
};

const throwDoesntExistError = (message = 'User does not exist') => {
  const err = new Error(message);
  err.name = 'DoenstExist';
  throw err;
};

const throwUnauthorizedError = (message) => {
  const err = new Error(message);
  err.name = 'UnauthorizedError';
  throw err;
};

const throwRequiredFieldError = (message = 'Some required fields are missing') => {
  const err = new Error(message);
  err.name = 'RequiredField';
  throw err;
};

const throwUserAlreadyRegistered = (message = 'User already registered') => {
  const err = new Error(message);
  err.name = 'UserAlreadyRegistered';
  throw err;
}; 
module.exports = {
  throwNotFoundError,
  throwUnauthorizedError,
  throwRequiredFieldError,
  throwUserAlreadyRegistered,
  throwDoesntExistError,
};