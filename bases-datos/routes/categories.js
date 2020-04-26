const { Router } = require('express');
const categoriesController = require('../controllers/categories');

var router = Router();

router
  .route('/categories')
  .get(categoriesController.index)
  .post(categoriesController.create);

router.get('/categories/new', categoriesController.new);

router.get('/categories/:id/edit', categoriesController.edit);

router
  .route('/categories/:id')
  .get(categoriesController.show)
  .put(categoriesController.update)
  .delete(categoriesController.destroy);

module.exports = router;
