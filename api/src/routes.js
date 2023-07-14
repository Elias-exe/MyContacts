const express = require('express');

const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');
const AccountController = require('./app/controllers/AccountController');

const router = express.Router();

router.get('/contacts', ContactController.index);

router.get('/contacts/:id', ContactController.show);

router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);

// List Account
router.get('/account', AccountController.index);
//Create Account
router.post('/account', AccountController.store);

module.exports = router;
