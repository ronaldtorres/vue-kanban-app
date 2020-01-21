const router = require('express').Router();
const TaskController = require('../../controllers/taskController');

router.get('/tasks', TaskController.all);
router.get('/tasks/:taskId', TaskController.find);
router.post('/tasks', TaskController.create);
router.put('/tasks/:taskId', TaskController.update);
router.patch('/tasks', TaskController.updateMany);
router.delete('/tasks/:taskId', TaskController.delete);


module.exports = router;