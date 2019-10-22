const TaskModel = require('../models/taskModel');
const r = require('express').response;
const response = {
    error(err){
        r.json({
            error: err,
            code: 400
        });
    }
}


module.exports = {
    all(req, res) {
        TaskModel.find({}, (err, docs) => {
            if (err) {
               response.error(err);
            }

            res.json({
                status: 'Success',
                code: 200,
                data: docs
            });
        });
    },

    create(req, res) {
        let data = new TaskModel(req.body);
        data.save().then((item) => {
            res.status = 200;
            res.json({
                message: 'Task add correctly',
                status: 200,
            })
        })
    },

    find(req, res) {
        let id = req.params.taskId;
        TaskModel.find({'_id': id}, (err, docs) => {
            if (err) {
                res.json({
                    error: err,
                    code: 400
                });
            }
    
            res.status(200).json(docs);
        });
    },

    delete(req, res) {
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
    }
}