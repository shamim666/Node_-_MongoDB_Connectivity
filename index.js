const express = require('express')
const { MongoClient } = require('mongodb');
const app = express()
const port = 7000


// user: dbuser1
// pass: 3mJ8WtRnDUUIDx0N




// mongodb connection uri
const uri = "mongodb+srv://dbuser1:3mJ8WtRnDUUIDx0N@cluster0.s3dal.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// mongodb instance or client creation
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// ======= method number 1  for db connectivity and data insertion ===========




/* client.connect(err => {

//client.db is database name and collection is a table name and document is a data or js object 
//which is stored in collection table

const collection = client.db("foodMaster").collection("users");

//to check db connection is ok
console.log('hitting database')

//here user is a document or data or js object which is to be stored in db

const user = {name:'hasan' , email:'hasan@gmail.com' , phone:'0157324234'}

//inserting the document(data or js object) into the collection(table) of db(foodMaster) 
collection.insertOne(user)

.then(()=>{
    console.log('insert success')
})
client.close(); // this line generates error so it would be excluded when run it 
});
  */



// ======= method number 2  using  ( async await ) for db connectivity and data insertion ===========


async function run() {
    try {
        await client.connect();
        const database = client.db("foodMaster");
        const users = database.collection("users");

        console.log('connection established to DB')
        // create a document or js object to insert
        const user = {
            name: "reza",
            email: "reza@gmail.com",
            phone: '01278884623'
        }
        const result = await users.insertOne(user);

        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } 
    
    finally {
        await client.close();
    }
}
run().catch(console.dir);

// to check the node server is ok 
// if you write in address bar of a browser below link and found  the send result
// http://localhost:7000

app.get('/', (req, res) => {
    res.send('this is CRUD server')
})

// to check the node server is ok
// if you type below command in cmd of that project and get result of console.log
// (nodemon index.js) or (npm run start-dev)

app.listen(port, () => {
    console.log('listening to port', port)
})