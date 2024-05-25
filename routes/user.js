const express = require('express');
const userController = require('../controllers/user');
const introController = require('../controllers/intro');
const userauthentication = require('../middleware/authentication');

const router = express.Router();

router.post('/add-user', userController.addUser);
router.post('/signin', userController.login);
router.get('/', introController.getMainpage);

module.exports = router;