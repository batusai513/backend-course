const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const session = require('express-session');
const ioServer = require('socket.io');
const SessionStore = require('connect-session-sequelize')(session.Store);
const taskRoutes = require('./routes/tasks_routes');
const registrationsRoutes = require('./routes/registrations_routes');
const sessionsRoutes = require('./routes/sessions_routes');
const categoriesRoutes = require('./routes/categories');
const findUserMiddleware = require('./middleware/find_user');
const db = require('./models');
// const tasks = require('./controllers/tasks');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// var sequelize = new Sequelize('curso_backend', 'root', '12345678', {
//   dialect: 'mysql',
// });

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '12345678',
//   database: 'curso_backend',
// });

// connection.connect();

// connection.query(
//   `create table if not EXISTS tasks(id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, description VARCHAR(255))`,
//   function (error, results, fields) {
//     if (error) throw error;
//     // console.log('The solution is: ', results);
//   }
// );

// connection.query(`insert into tasks(description) VALUES(?)`, req.body.description);

// connection.query('select * from tasks;', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
//   console.log('The solution is: ', fields);
// });

// db.sequelize.sync();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(
  session({
    store: new SessionStore({
      db: db.sequelize,
    }),
    secret: [
      'asjdg aksjgdakjdgakjsdgaskjdgaksjdga3g43ig4kkdsjfg',
      'asdasdasdasd424hkj24h3kjh4kjehrkj',
    ],
    saveUninitialized: false,
    resave: false,
  })
);
app.use(findUserMiddleware);

app.use(taskRoutes);
app.use(registrationsRoutes);
app.use(sessionsRoutes);
app.use(categoriesRoutes);

app.get('/', function home(req, res) {
  res.render('home', {
    user: req.user || {},
  });
});

// app.get('/tasks', tasks.home);

// app.post('/pendientes', function (req, res) {
//   res.send('Finalizado');
// });

var server = app.listen('3000', function root() {
  console.log('launched 🚀');
});

// codigo ejemplo servido/cliente
var io = ioServer(server);

var usersCount = 0;
var sockets = {};

io.on('connection', function onConnection(socket) {
  var userId = socket.request._query.loggedUser;
  if (userId) {
    sockets[userId] = socket;
  }

  usersCount++;
  io.emit('count_updated', { count: usersCount });

  socket.on('new_task', function onNewTask(data) {
    if (data.userId) {
      var userSocket = sockets[data.userId];
      if (!userSocket) {
        return;
      }
      userSocket.emit('new_task', data);
    }
  });

  socket.on('disconnect', function onDisconnect() {
    usersCount--;

    Object.keys(sockets).forEach((userId) => {
      var s = sockets[userId];
      if (s.id === socket.id) {
        delete sockets[userId];
      }
    });

    console.warn(sockets);

    io.emit('count_updated', { count: usersCount });
  });
});

// process.on('SIGINT', function SIGINT(params) {
//   console.log('Bye 👋');
//   connection.end();
//   process.exit();
// });

const client = require('./realtime/client');
