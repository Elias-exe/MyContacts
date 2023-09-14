const express = require('express');

const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');
const AccountController = require('./app/controllers/AccountController');
const Auth = require('./app/middlewares/auth');

const router = express.Router();

// List Account
router.get('/account', AccountController.index);
//Create Account
router.post('/registerUser', AccountController.registerUser);
// Login Account
router.post('/signUp', AccountController.signUp);

router.get('/user/validateToken', Auth);

//Private Routes
router.post('/listContacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);
router.post('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);



module.exports = router;
