const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    list: String,
    author: String,
    date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('task', taskSchema);