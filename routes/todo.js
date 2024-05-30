const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
const userAuthentication = require('../middleware/authentication');

router.post('/add-list', userAuthentication.authenticate, todoController.addLists);
router.post('/add-task', userAuthentication.authenticate, todoController.addTasks);

router.get('/get-lists', userAuthentication.authenticate, todoController.getLists);
router.get('/get-tasks/:listId', userAuthentication.authenticate, todoController.getTasks);

router.delete('/delete-list/:listId', userAuthentication.authenticate, todoController.deleteLists);
router.delete('/delete-task/:taskId', userAuthentication.authenticate, todoController.deleteTask);

router.post('/done-task/:taskId', todoController.doneTask);

module.exports = router;