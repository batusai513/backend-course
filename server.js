const http = require('http');

function handler(req, res) {
  res.end('hola mundo');
}

var server = http.createServer(handler);

server.listen('3000');
