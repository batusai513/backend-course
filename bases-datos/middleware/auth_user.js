module.exports = function authMiddleware(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/sessions');
  }
};
