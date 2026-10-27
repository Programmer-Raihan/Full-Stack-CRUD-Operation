const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config()

const port = 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI;

// access-control-allow-origin (frontend and backend connection)
app.use(cors())
app.use(express.json());



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const contactCollection = client.db('contact-manager-db').collection('contacts');

        // creating a new contact
        app.post('/contacts', async (req, res) => {
            const newContact = req.body;
            const result = await contactCollection.insertOne(newContact);
            res.send(result)
        })

        // getting a contact
        app.get('/contacts', async (req, res) => {
            const cursor = contactCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        // single read api reader
        app.get('/contacts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await contactCollection.findOne(query);
            res.send(result)

        });

        // update api
        // app.put('/contacts/:id', async (req, res) => {
        // const id = req.params.id;
        // const filter = { _id: new ObjectId(id) };
        // const updateContact = req.body;
        // const updateDoc = {
        //     $set: {
        //         name: updateContact.name,
        //         email: updateContact.email,
        //         phone: updateContact.phone,

        //     }
        // };
        // const result= await contactCollection.updateOne(filter, updateDoc);
        // res.send(result);

        //     const result = await contactCollection.updateOne(
        //         {
        //             _id: new ObjectId(req.params.id)
        //         },
        //         {
        //             $set: req.body
        //         }
        //     );
        //     res.send(result)
        // });
        // update data
        app.patch("/contacts/:id", async (req, res) => {
            const { id } = req.params;
            const updatedData = req.body;
            const filter = {_id: new ObjectId(id)};
            const UpdateDoc = {
                $set: {
                    ...updatedData,
                }
            };
            const result = await contactCollection.updateOne(filter, UpdateDoc)
            res.send(result)
        })

        // most important DELTE method
        app.delete('/contacts/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) };
            const result = await contactCollection.deleteOne(query);
            res.send(result);
        })



        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {


        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('server is working well and I can see this text on screen!')
});


app.listen(port, () => {
    console.log(`Server is working and I can see this on terminal and the port is ${port}`)
});
