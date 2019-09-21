const router = require('express').Router();
const TaskModel = require('../../models/models').taskModel;


router.get('/tasks', function (req, res) {
    TaskModel.find({}, (err, docs) => {
        if (err) {
            res.json({
                error: err,
                code: 400
            });
        }

        res.json({
            status: 'Success',
            code: 200,
            data: docs
        });
    });

});

router.post('/task', function (req, res) {
    let data = new TaskModel(req.body);
    data.save().then((item) => {
        res.status = 200;
        res.json({
            message: 'Task add correctly',
            status: 200,
        })
    })
});

router.get('/task/:taskId', function (req, res) {
    TaskModel.find({'_id': req.params.taskId}, (err, docs) => {
        if (err) {
            res.json({
                error: err,
                code: 400
            });
        }

        res.json({
            status: 'Success',
            code: 200,
            data: docs
        });
    });
});

router.delete('/task/:taskId', function (req, res) {
    TaskModel.findByIdAndRemove({'_id': req.params.taskId}, (err, doc) => {
        if(err) return res.json({
            error: err,
            code: 400
        });
        res.json({
            status: 'Success',
            code: 200,
            message: 'the task has been deleted'
        });
    })
});


module.exports = router;