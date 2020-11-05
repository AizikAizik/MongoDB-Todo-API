const {MongoClient, ObjectID} = require('mongodb')
const URL = 'mongodb://localhost:27017/TodoApp'

MongoClient.connect(URL, (error, client) =>{
    if(error){
        return console.error('Unable to connect to the MongoDB service!!')
    }

    console.log('Connected to the MongoDb service successfully!!');
    const db = client.db('TodoApp');

    //delete all documents who have first name of Peter
    db.collection('Users')
        .deleteMany({firstName : "Peter"})
        .then(result =>{
            console.log(JSON.stringify(result.result, null, 2));
        })
        .catch(err =>{
            console.error(err);
        })

    //delete only one document found first with the last name of Ogunleye
    db.collection('Users')
        .deleteOne({lastName : "Ogunleye"})
        .then(result =>{
            console.log(JSON.stringify(result.result, null, 2));
        })
        .catch(err =>{
            console.error(err);
        })

    //find one an delete method returns the deleted document in an object
    db.collection('Users')
        .findOneAndDelete({lastName : 'Jones'})
        .then(result =>{
            console.log(result);
        }).catch(e => {
            console.error(e);
        })
})