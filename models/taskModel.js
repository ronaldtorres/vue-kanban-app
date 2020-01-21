const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    description: String,
    list: String,
    author: String,
    status: Number,
    order: Number,
    date: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('task', taskSchema);