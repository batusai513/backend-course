const express = require('express');
const path = require('path');

var app = express();

app.use(
  '/assets',
  express.static(path.join(__dirname, 'static'), {
    etag: false,
    maxAge: '5h'
  })
);

app.set('view engine', 'ejs');

// app.get('/', function (req, res) {
//   res.sendFile('index.html', {
//     root: __dirname,
//   });
// });

app.get('/', function (req, res) {
  res.render('index');
});

app.listen('3000', function root() {
  console.log('launched 🚀');
});

// estrategias de cache de express, etag (entity tag), max-age
// ETag: W/"b1-1717f1c0d24" para el archivo styles.css
