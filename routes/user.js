const express = require('express');
const userController = require('../controllers/user');
const introController = require('../controllers/intro');
const userAuthentication = require('../middleware/authentication');

const router = express.Router();

router.post('/add-user', userController.addUser);
router.get('/get-users', userAuthentication.authenticate, userController.getAlluser)
router.post('/signin', userController.login);
router.get('/', introController.getMainpage);

module.exports = router;