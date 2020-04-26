const User = require('../models').User;

module.exports = {
  new(req, res) {
    res.render('sessions/new.pug');
  },
  create(req, res) {
    const { email, password } = req.body;
    User.login(email, password)
      .then((user) => {
        if (!user) {
          res.sendStatus(404);
        }
        req.session.userId = user.id;
        res.json(user);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  destroy(req, res) {
    req.session.destroy(function onDestroy() {
      res.redirect('/sessions');
    });
  },
};
