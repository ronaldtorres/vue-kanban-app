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
                code: 200,
                data: docs
            });
        });
    },

    create(req, res) {
        let data = new TaskModel(req.body);
        data.save().then((item) => {
            res.json({
                data: item,
                code: 201,
            })
        })
    },

    find(req, res) {
        TaskModel.findById({'_id': req.params.taskId}, (err, docs) => {
            if (err) {
               return res.json({
                    error: err,
                    code: 400
                });
            }
    
            res.status(200).json({
                data: docs
            });
        });
    },

    update(req, res){
        TaskModel.findByIdAndUpdate({_id: req.params.taskId}, req.body, (err, doc) => {
            if(err) {
                response.error(err);
            };

            res.json({
                code: 200,
                data: doc
            });
        })
    },

    updateMany(req, res){
        
        if(!Array.isArray(req.body)){
            res.status(400).json({
                error: "Please provide an array"
            });
        }else if(req.body.length <= 0){
            res.json({
                code: 200,
                message: 'Nothing to update',
            });
        }

        let errors = [];

        req.body.forEach(task => {
            TaskModel.findByIdAndUpdate({_id: task._id}, task, (err, doc) => {
                if(err) {
                    errors.push(err);
                };
            })
        });

        res.json({
            code: 200,
            data: "Ok",
            possibleErrors: errors
        });

    },

    delete(req, res) {
        TaskModel.findByIdAndRemove({_id: req.params.taskId}, (err, doc) => {
            if(err) {
                response.error(err);
            };

            res.json({
                code: 200,
                message: 'the task has been deleted',
                data: doc
            });
        })
    }
}