const User = require('../models').User;
module.exports = function findUser(req, res, next) {
  const { session } = req;
  if (!session.userId) {
    return next();
  }
  return User.findByPk(session.userId).then((user) => {
    if (user) {
      req.user = user;
      next();
    }
  });
};
