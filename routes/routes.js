const router = require('express').Router();

/* router.all('/*', function(req, res){
    res.send('This route does not exist.');
}); */
router.use(require('./partials/taskRoutes'));



module.exports = router;