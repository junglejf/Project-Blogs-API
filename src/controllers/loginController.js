const loginService = require('../services/loginService');

const loginController = {
   async authLogin(req, res) {
    const userInfo = await loginService.validateBodyLogin(req.body);
    const user = await loginService.validateUser(userInfo);
    const token = await loginService.makeToken(user);
    return res.status(200).json({ token });
  },
};

module.exports = loginController;
