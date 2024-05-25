const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
const userauthentication = require('../middleware/authentication');

router.post('/add-list', userauthentication.authenticate, todoController.addLists);
router.post('/add-task', userauthentication.authenticate, todoController.addTasks);

router.get('/get-lists', userauthentication.authenticate, todoController.getLists);
router.get('/get-tasks/:listId', userauthentication.authenticate, todoController.getTasks);

router.delete('/delete-list/:listId', userauthentication.authenticate, todoController.deleteLists);
router.delete('/delete-task/:taskId', userauthentication.authenticate, todoController.deleteTask);

router.post('/done-task/:taskId', todoController.doneTask);

module.exports = router;