const io = require('socket.io-client');

var socket = io.connect('http://localhost:3000', { reconnection: true });

socket.on('connect', function onConnect() {
  console.warn('\n\nconnected from node JS\n\n');
});

module.exports = socket;
