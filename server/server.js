const express = require('express');
const bodyParser = require('body-parser')
const _ = require('lodash')
const {ObjectID} = require('mongodb')

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
    });

    //add the todo to the database
    todo.save()
        .then(todo =>{
            console.log(req.ip);
            res.send({todo})
        })
        .catch(err =>{
            res.status(400).send(err)
        })
})

//todo route (GET method)
//fetch all todos
app.get('/todos', (req, res) =>{
    Todo.find()
        .then( todos => {
            res.send({todos})
        } )
        .catch((err) => {
            res.status(400).send(err.message);
        })
})

//todo/id route (GET method)
//get a specific todo by a parameter id passed in the Url
app.get('/todos/:id', (req, res) =>{
    const {id} = req.params;

    if(ObjectID.isValid(id)){
        Todo.findById(id)
            .then(todo =>{
                if(todo){
                    res.json({todo})
                }else{
                    res.status(404).send({error : 'ID does not exist in the DB'})
                }
            })
    }else{
        res.status(400).send({error : 'ID is not Valid!!'})
    }
})

//todo/id route (DELETE method)
//delete a specific todo id passed in the URL
app.delete('/todos/:id', (req, res) =>{
    const {id} = req.params;

    if(ObjectID.isValid(id)){
        Todo.findByIdAndRemove(id)
            .then(todo =>{
                if(todo){
                    console.log(`Todo removed!!`)
                    res.json({todo})
                }else{
                    res.status(404).send({error : 'ID does not exist in the DB'})
                }
            })
    }else{
        res.status(400).send({error : 'ID is not Valid!!'})
    }
})

//todo/id route (PATCH method)
// update a specific todo data (text or completed value)
app.patch('/todos/:id', (req, res) =>{
    const {id} = req.params;
    //only pick two properties to update from request.body
    const bodyData = _.pick(req.body, ['text', 'completed']);
    const isIdValid = ObjectID.isValid(id)
    if(!isIdValid){
        return res.status(400).send({error : 'ID is not Valid!!'})
    }
    // destructure 2 variables from object
    let {text, completed} = bodyData;
    // check if value of completed is a Boolean or not
    const isCompletedABoolean = _.isBoolean(completed);
    if(isCompletedABoolean && completed){
        bodyData.completedAt = new Date().getTime()
    }else{
        bodyData.completedAt = null;
        bodyData.completed = false;
    }

    //update the TODO by the ID
    Todo.findByIdAndUpdate(id,
        {$set: bodyData},
        {new: true}
    ).then((todo) => {
        if(todo){
            console.log('Todo Updated!!');
            return res.send({todo})
        }else{
            return res.status(404).send({msg : 'Todo not Found'})
        }
    }).catch((err) => {
        console.log(`${err.message}`)
        res.status(500).send({msg : 'Server DB Error'})
    })
})

const port = process.env.PORT || 5050;

app.listen(port, console.log(`server is running on port ${port}`))
