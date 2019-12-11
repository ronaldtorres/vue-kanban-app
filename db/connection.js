const mongoose = require('mongoose');

module.exports = () => {
    
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/bijju',  {useNewUrlParser: true, useFindAndModify: false});

    let connection = mongoose.connection;
    connection.on('error', console.error.bind(console, 'Fail to connect DB'));
    
    connection.on('open', () => {
        console.info('Correct connection');
    });
  
}

