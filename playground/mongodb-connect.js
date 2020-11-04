const MongoClient = require('mongodb').MongoClient;

const URL = 'mongodb://localhost:27017/TodoApp'

MongoClient.connect(URL, (err, client) =>{
    if(err)
        return console.log('Unable to connect to the MongoDB service!!');

    console.log('Connected to the MongoDb service successfully!!');
    const db = client.db('TodoApp');

    add Todo Collection
    db.collection('Todos')
        .insertMany(
            [
                {
                    text : "Buy milk today",
                    completed : false,
                    DateTimeAdded : new Date()
                },
                {
                    text : "Visit Girlfriend",
                    completed : false,
                    DateTimeAdded : new Date()
                },
                {
                    text : "Read Flutter text book",
                    completed : false,
                    DateTimeAdded : new Date()
                }

            ],
            (err, result) =>{
                if (err){
                    return console.log('Unable to Insert todo document', err)
                }
                console.log(JSON.stringify(result.ops, null, 2));
            }
        )

    //add User Collection
    db.collection('Users')
        .insertMany(
            [
                {
                    firstName : "Jacob",
                    lastName : "Oniel",
                    password : `jacob123`
                },
                {
                    firstName : "Sarah",
                    lastName : "Williams",
                    password : `sarasara`
                },
                {
                    firstName : "Isaac",
                    lastName : "Ogunleye",
                    password : `AizikAizik`
                },

            ],
            (err, result) =>{
                if (err){
                    return console.log('Unable to Insert todo document', err)
                }
                console.log(JSON.stringify(result.ops, null, 2));
            }
        )

    client.close();
})
