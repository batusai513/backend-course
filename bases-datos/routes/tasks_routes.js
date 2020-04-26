const express = require('express');
const tasks = require('../controllers/tasks');
const authUserMiddleware = require('../middleware/auth_user');

var router = express.Router();

router.use('/tasks', authUserMiddleware);

router.route('/tasks').get(tasks.index).post(tasks.create);

router.get('/tasks/new', tasks.new);

router.get('/tasks/:id/edit', tasks.edit);

router
  .route('/tasks/:id')
  .get(tasks.show)
  .put(tasks.update)
  .delete(tasks.destroy);

module.exports = router;
