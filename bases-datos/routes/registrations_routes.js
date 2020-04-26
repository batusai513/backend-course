const express = require('express');
const registrationsController = require('../controllers/registrations');

const router = express.Router();

router.get('/singup', registrationsController.new);

router.route('/users').post(registrationsController.create);

module.exports = router;
