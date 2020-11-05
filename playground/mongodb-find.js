const {MongoClient, ObjectID} = require('mongodb');

const URL = 'mongodb://localhost:27017/TodoApp'

MongoClient.connect(URL, (err, client) =>{
    if(err)
        return console.log('Unable to connect to the MongoDB service!!');

    console.log('Connected to the MongoDb service successfully!!');
    const db = client.db('TodoApp');

    //find all items
    db.collection('Todos').
        find() // find() returns a Cursor
        .toArray() // toArray() returns a Promise
        .then((docs) =>{
            console.log('Todos');
            console.log(JSON.stringify(docs, null, 2));
        })
        .catch(err => {
            console.error('error fetching from database!!!', err)
        })

    //find the number of counts stored
    db.collection('Todos')
        .find()
        .count()
        .then(count =>{
            console.log(`Number of records returned are: ${count}`);
        })
        .catch(err =>{
            console.error(err);
        })

    //find a specific document by the _id property
    db.collection('Todos')
        .find({_id : new ObjectID('5fa2cfc04e2bc23a9c2902a5')}) //find() returns a Cursor
        .toArray() // toArray() returns a promise
        .then(doc =>{
            console.log('Todos By ID');
            console.log(JSON.stringify(doc, null, 2));
        })
        .catch(err =>{
            console.error(err);
        })

    //find a specific document by the name property
    db.collection('Users')
        .find({firstName : "Isaac"}) //find() returns a Cursor
        .toArray() // toArray() returns a promise
        .then(doc =>{
            console.log('Todos By Name');
            console.log(JSON.stringify(doc, null, 2));
        })
        .catch(err =>{
            console.error(err);
        })
})