const mongoose = require('mongoose')

//create a new Model
const Todo = mongoose.model('Todo', {
    text :{
        type : String,
        required : true,
        minlength : 2,
        trim : true
    },
    completed :{
        type : Boolean,
        default : false
    },
    completedAt :{
        type : Number,
        default : null
    }
})

module.exports = { Todo }