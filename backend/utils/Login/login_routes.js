const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('./login_controller');

// User registration
router.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  userController.registerUser
);

// User login
router.post('/login',
  body('email').isEmail(),
  body('password').exists(),
  userController.loginUser
);

module.exports = router;
