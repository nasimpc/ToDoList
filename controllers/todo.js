const Lists = require('../models/lists');
const Tasks = require('../models/tasks');

exports.addLists = async (req, res, next) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const data = await req.user.createList({ title: title, description: description });
        res.status(201).json({ newListDetails: data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Interenal Server err' });
    }
}
exports.addTasks = async (req, res, next) => {
    try {
        const task = req.body.task;
        const lId = req.body.listId;
        const data = await Tasks.create({ task: task, ListId: lId });
        res.status(201).json({ newTaskDetails: data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Interenal Server err' });
    }
}

exports.getLists = async (req, res, next) => {
    try {
        const uId = req.user.dataValues.id;
        const lists = await Lists.findAll({ where: { UserId: uId } });
        res.status(200).json({ allLists: lists });
    }
    catch (error) {
        console.log(err);
        res.status(500).json({ message: 'Interenal Server err' });
    }
}
exports.getTasks = async (req, res, next) => {
    try {
        const listId = req.params.listId;
        const tasks = await Tasks.findAll({ where: { ListId: listId } });
        res.status(200).json({ allTasks: tasks });
    }
    catch (error) {
        console.log('Get task is failing', error);
        res.status(500).json({ message: 'Interenal Server err' });
    }
}

exports.deleteLists = async (req, res) => {
    try {
        const listId = req.params.listId;
        await Lists.destroy({ where: { id: listId } });
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        await Tasks.destroy({ where: { id: taskId } });
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.doneTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        await Tasks.update({ done: true }, { where: { id: taskId } });
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
