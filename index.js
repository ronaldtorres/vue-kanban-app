const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;


// Active security Middlewares by Helmet   
app.use(helmet());

// Use body-parser library to implement Middlewares that works with requests based on json or forms.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Init DB

//require('./db/connection')();

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