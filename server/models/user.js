const mongoose = require('mongoose')

// create a User model
const User = mongoose.model('User', {
    email : {
        require : true,
        type : String,
        trim : true,
        minlength : 5
    }
})

module.exports = { User }