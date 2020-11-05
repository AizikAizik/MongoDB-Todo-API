const {MongoClient, ObjectID} = require('mongodb')
const URL = 'mongodb://localhost:27017/TodoApp'

MongoClient.connect(URL, (error, client) =>{
    if(error){
        return console.log('Error Connecting to the MongoDB service!!');
    }

    console.log('Connected Succesfully to the MongoDB service!!');
    const db = client.db('TodoApp');

    //update fields in a document by using the _id property
    db.collection('Todos')
        .findOneAndUpdate(
            {_id : new ObjectID('5fa2c8071bbec537a43faf21')},
            {$set :{completed : true}},
            {returnOriginal : false}
        )
        .then(result =>{
            console.log(result);
        })
        .catch(e =>{
            console.log(e);
        })
})
