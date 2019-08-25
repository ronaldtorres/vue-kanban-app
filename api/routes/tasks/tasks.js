const router = require('express').Router();

/* router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
}); */

router.get('/tasks', function (req, res) {
    res.send('Get Tasks');
});

router.post('/task', function (req, res) {
    res.send('Create task');
});

router.get('/task/:taskId', function(req, res){
    res.send(
        req.params.taskId
    );
});


module.exports = router;