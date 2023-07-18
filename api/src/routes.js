const express = require('express');

const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');
const AccountController = require('./app/controllers/AccountController');
const jwtUtils = require('./app/utils/jwtUtils');

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
router.post('/registerUser', AccountController.registerUser);
// Login Account
router.post('/signUp', AccountController.signUp);

router.post('/user/generateToken', jwtUtils.generateToken);

router.get('/user/validateToken', jwtUtils.verifyToken)

module.exports = router;
