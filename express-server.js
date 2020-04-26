// @ts-check
const express = require('express');
const bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.get('/saludo', function root(req, res) {
  res.send(`hola ${req.query.name}`);
});

app.post('/saludo', function root(req, res) {
  res.send(`hola ${req.body.name}`);
});

app.listen(3000, function name() {
  console.log('launched 🚀');
});
