const express = require('express');
const cookieSession = require('cookie-session');

var app = express();

app.use(
  cookieSession({
    httpOnly: true,
    name: 'session',
    keys: ['asdasdasdasdasd', 'key2'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.get('/', function (req, res) {
  req.session.visits = (req.session.visits ? req.session.visits : 0) + 1;
  res.send(`${req.session.visits}`);
});

app.listen('3000', function root() {
  console.log('launched 🚀');
});
