const router = require('express').Router();
const TaskModel = require('../../models/models').taskModel;
const TaskController = require('../../controllers/taskController');

router.get('/tasks', TaskController.all);
router.get('/tasks/:taskId', TaskController.find);
router.post('/tasks', TaskController.create);
router.delete('/tasks/:taskId', TaskController.delete);


module.exports = router;