const express = require('express');
const app = express();
const helmet = require('helmet');
const PORT = process.env.PORT || 3000;


// Active security Middlewares by Helmet   
app.use(helmet());

app.get('/', (req, res) => {
    res.redirect('/api');
});

app.get('/api', (req, res) => {
    res.send('Welcome to the Tasks API');
});

app.use('/api', require('./api/routes/routes'));

app.listen(PORT, _ => {
    console.log('Listen on port:', PORT)
});