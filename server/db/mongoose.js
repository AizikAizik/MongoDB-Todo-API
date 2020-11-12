const mongoose = require('mongoose');

const URL = 'mongodb://localhost:27017/TodoApp';

mongoose.Promise = global.Promise;

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})

module.exports = {
    mongoose
}