const { Task, User } = require('../models');

module.exports = {
  create(req, res) {
    Task.create({
      description: req.body.description,
      userId: req.session.userId,
    }).then(
      (response) => {
        res.json(response);
      },
      (err) => {
        res.json(err);
      }
    );
  },
  new(req, res) {
    res.render('tasks/new.pug');
  },
  index(req, res) {
    return Task.findAll({
      where: { userId: req.session.userId },
      include: [
        {
          model: User,
          as: 'user',
          required: true,
        },
      ],
    }).then(function allTasks(tasks) {
      res.render(
        'tasks/index.pug',
        {
          tasks,
        },
        function error(error, html) {
          if (error) {
            return res.sendStatus(500);
          }
          return res.send(html);
        }
      );
    });
  },
  show(req, res) {
    const { id } = req.params;
    Task.findByPk(id, {
      include: ['user'],
    }).then(
      (task) => {
        res.render('tasks/show', {
          task,
        });
      },
      (err) => {
        res.sendStatus(400);
      }
    );
  },
  update(req, res) {
    const { description } = req.body;
    const { id } = req.params;
    Task.update(
      { description },
      {
        where: {
          id,
        },
      }
    ).then((task) => {
      res.redirect(`/tasks/${id}`);
    });
  },
  edit(req, res) {
    const { id } = req.params;
    Task.findByPk(id).then((task) => {
      if (task) {
        res.render('tasks/edit.pug', { task });
      } else {
        res.sendStatus(404);
      }
    });
  },
  destroy(req, res) {
    const { id } = req.params;
    Task.destroy({
      where: {
        id,
      },
    }).then((response) => {
      res.redirect('/tasks');
    });
  },
};
