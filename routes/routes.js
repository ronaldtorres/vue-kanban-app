const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Welcome to the api');
});

router.use(require('./partials/taskRoutes'));

router.all('/*', function(req, res){
    res.send('This route does not exist.');
});

module.exports = router;