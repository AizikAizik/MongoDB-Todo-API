const express = require('express');
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user')

const app = express();

//use body parser middleware
app.use(bodyParser.json());

// todo route (POST method)
app.post('/todos', (req, res) =>{
    const {text} = req.body;

    //create a new todo item
    const todo = new Todo({
        text 
    })

    //add the todo to the database
    todo.save()
        .then(doc =>{
            res.send(doc)
        })
        .catch(err =>{
            res.status(400).send(err)
        })
})

const port = process.env.PORT || 5050;

app.listen(port, console.log(`server is running on port ${port}`))