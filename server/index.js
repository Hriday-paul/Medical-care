const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const cors = require("cors")

app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: ['http://localhost:5173',],
//     credentials: true
// }));

app.get('/', (req, res) => {
    res.send({ message: 'Your ser is live !!!!!  ):' })
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fzz1qah.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const dataBase = client.db("medicare");
        const userList = dataBase.collection("users");
        const testList = dataBase.collection("tests");

        app.put('/user', async (req, res) => {
            try {
                const filter = { email: req.body.email }
                const options = { upsert: true };
                const updateDoc = {
                    $set: req.body
                }
                const result = await userList.updateOne(filter, updateDoc, options);
                res.send(result);
            } catch (err) {
                res.status(400).send({ message: err.message })
            }
        })

        // get all users
        app.get('/users', async (req, res) => {
            try {
                const result = await userList.find({email: { $ne: 'admin@gmail.com' }},
                    {
                        password: 0,
                    }
                ).toArray();
                res.send(result);
            } catch (err) {
                res.status(400).send({ message: err.message })
            }
        })

        // add new test
        app.post('/addTest', async (req, res) => {
            try {
                const testData = req.body;
                const result = await testList.insertOne(testData);
                res.send(result);
            } catch (err) {
                res.status(400).send({ message: err.message })
            }
        })

        // get all test
         app.get('/allTest', async (req, res) => {
            try {
                const result = await testList.find().toArray();
                res.send(result);
            } catch (err) {
                res.status(400).send({ message: err.message });
            }
        })

        // update test
        app.put('/updateTest', async (req, res) => {
            try {
                const updatedData = req.body;
                const query = {_id : new ObjectId(updatedData.id)}
                delete updatedData.id;
                const finalData = {
                    $set : updatedData
                }
                const result = await testList.updateOne(query, finalData)
                res.send(result);
            } catch (err) {
                res.status(400).send({ message: err.message });
            }
        })

        //delete a test
        app.delete('/deleteTest/:id', async (req, res) => {
            try {
                const query = {_id : new ObjectId(req.params.id)};
                const result = await testList.deleteOne(query)
                res.send(result);
            } catch (err) {
                res.status(400).send({ message: err.message });
            }
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`your server running on => http://localhost:${port}`);
})