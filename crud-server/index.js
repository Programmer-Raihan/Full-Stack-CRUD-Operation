// const express = require('express');
// const cors = require('cors')
// const app = express();
// require('dotenv').config()

// const port = process.env.PORT || 4000;
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = process.env.MONGODB_URI;

// // access-control-allow-origin (frontend and backend connection)
// app.use(cors())
// app.use(express.json());



// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         await client.connect();
//         const contactCollection = client.db('contact-manager-db').collection('contacts');

//         // creating a new contact
//         app.post('/contacts', async (req, res) => {
//             const newContact = req.body;
//             const result = await contactCollection.insertOne(newContact);
//             res.send(result)
//         })

//         // getting a contact
//         app.get('/contacts', async (req, res) => {
//             const cursor = contactCollection.find()
//             const result = await cursor.toArray()
//             res.send(result)
//         })

//         // single read api reader
//         app.get('/contacts/:id', async (req, res) => {
//             const id = req.params.id;
//             const query = { _id: new ObjectId(id) };
//             const result = await contactCollection.findOne(query);
//             res.send(result)

//         });

//         app.patch("/contacts/:id", async (req, res) => {
//             const { id } = req.params;
//             const updatedData = req.body;
//             const filter = {_id: new ObjectId(id)};
//             const UpdateDoc = {
//                 $set: {
//                     ...updatedData,
//                 }
//             };
//             const result = await contactCollection.updateOne(filter, UpdateDoc)
//             res.send(result)
//         })

//         // most important DELTE method
//         app.delete('/contacts/:id', async (req, res) => {
//             const id = req.params.id
//             const query = { _id: new ObjectId(id) };
//             const result = await contactCollection.deleteOne(query);
//             res.send(result);
//         })



//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {


//     }
// }
// run().catch(console.dir);


// app.get('/', (req, res) => {
//     res.send('server is working well and I can see this text on screen!')
// });


// app.listen(port, () => {
//     console.log(`Server is working and I can see this on terminal and the port is ${port}`)
// });
// module.exports = app;

const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Client
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let contactCollection;

async function getCollection() {
    if (!contactCollection) {
        await client.connect();
        contactCollection = client.db('contact-manager-db').collection('contacts');
    }
    return contactCollection;
}

// Routes
app.get('/', (req, res) => {
    res.send('server is working well and I can see this text on screen!');
});

// creating a new contact
app.post('/contacts', async (req, res) => {
    try {
        const collection = await getCollection();
        const newContact = req.body;
        const result = await collection.insertOne(newContact);
        res.status(201).json(result);
    } catch (error) {
        console.error("POST /contacts error:", error);
        res.status(500).json({ error: "Failed to create contact" });
    }
});

// getting all contacts
app.get('/contacts', async (req, res) => {
    try {
        const collection = await getCollection();
        const result = await collection.find().toArray();
        res.status(200).json(result);
    } catch (error) {
        console.error("GET /contacts error:", error);
        res.status(500).json({ error: "Failed to fetch contacts" });
    }
});

// single read api reader
app.get('/contacts/:id', async (req, res) => {
    try {
        const collection = await getCollection();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await collection.findOne(query);
        res.status(200).json(result);
    } catch (error) {
        console.error("GET /contacts/:id error:", error);
        res.status(500).json({ error: "Failed to fetch single contact" });
    }
});

// update contact
app.patch("/contacts/:id", async (req, res) => {
    try {
        const collection = await getCollection();
        const { id } = req.params;
        const updatedData = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
            $set: {
                ...updatedData,
            }
        };
        const result = await collection.updateOne(filter, updateDoc);
        res.status(200).json(result);
    } catch (error) {
        console.error("PATCH /contacts/:id error:", error);
        res.status(500).json({ error: "Failed to update contact" });
    }
});

// delete contact
app.delete('/contacts/:id', async (req, res) => {
    try {
        const collection = await getCollection();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await collection.deleteOne(query);
        res.status(200).json(result);
    } catch (error) {
        console.error("DELETE /contacts/:id error:", error);
        res.status(500).json({ error: "Failed to delete contact" });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

// Vercel serverless হ্যান্ডলারের জন্য এটি আবশ্যিক
module.exports = app;