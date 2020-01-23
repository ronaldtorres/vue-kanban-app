// request .env
require('dotenv').config();

// variables
const express = require('express');
const app = express();
const helmet = require('helmet');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

// Active security Middlewares by Helmet   
app.use(helmet());

app.use(express.static('./public'));

// Use body-parser library to implement Middlewares that works with requests based on json or forms.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Init DB
require('./db/connection')();

app.get('/', (req, res) => {
    //res.redirect('/api');
    res.render('home', {
        title: 'home'
    })
});

app.get('/api', (req, res) => {
    res.send('Welcome to the Tasks API');
});

app.use('/api', require('./routes/routes'));

app.listen(PORT, _ => {
    console.log('Listen on port:', PORT)
});
