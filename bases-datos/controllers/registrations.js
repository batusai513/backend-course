const User = require('../models').User;

module.exports = {
  new(req, res) {
    res.render('registrations/new.pug');
  },
  create(req, res) {
    const { email, password } = req.body;
    const data = { email, password };
    User.create(data).then(
      (result) => {
        res.json(result);
      },
      (err) => {
        res.json(err);
      }
    );
  },
};
