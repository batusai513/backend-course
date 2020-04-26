const { Category } = require('../models');

module.exports = {
  index(req, res) {
    Category.findAll().then((categories) => {
      res.render('categories/index.pug', { categories });
    });
  },
  new(req, res) {
    res.render('categories/new');
  },
  create(req, res) {
    const { title, color } = req.body;

    Category.create({
      title,
      color,
    }).then((result) => {
      res.redirect('/categories');
    });
  },

  show(req, res) {
    const { id } = req.params;
    Category.findByPk(id).then((category) => {
      if (!category) {
        res.sendStatus(404);
      } else {
        res.render('categories/show', {
          category,
        });
      }
    });
  },
  edit(req, res) {
    const { id } = req.params;
    Category.findByPk(id).then((category) => {
      if (!category) {
        res.sendStatus(400);
      } else {
        res.render('categories/edit', { category });
      }
    });
  },
  update(req, res) {
    const {
      body: { title, color },
      params: { id },
    } = req;
    Category.update(
      { title, color },
      {
        where: { id },
      }
    ).then((result) => {
      res.redirect(`/categories/${id}`);
    });
  },
  destroy(req, res) {
    Category.destroy({
      where: {
        id: req.params.id,
      },
    }).then((removed) => {
      res.redirect('/categories');
    });
  },
};
