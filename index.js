const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000


// midleWare 
app.use(cors())
app.use(express.json())


// jhadh1212
// TAHrTODjt3mBOvE9



const uri = "mongodb+srv://jhadh1212:TAHrTODjt3mBOvE9@cluster0.gbi1i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

        const dataBaseCollection = client.db('insertData').collection('singleData')

        // get data 
        app.get('/users', async (req, res) => {
            const cursor = dataBaseCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })


        app.get(`/users/:id`, async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            console.log(query)
            const result = await dataBaseCollection.findOne(query)
            res.send(result)
        })


        app.put('/users/:id', async (req, res) => {
            const id = req.params.id
            const body = req.body
            console.log(body)
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: body.name,
                    email: body.email
                }
            }
            const result = await dataBaseCollection.updateOne(filter, updateDoc, options)
            res.send(result)
        })



        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            console.log(query)
            const result = await dataBaseCollection.deleteOne(query)
            res.send(result)
        })



        // post data 
        app.post('/users', async (req, res) => {
            const users = req.body
            console.log(users)
            const result = await dataBaseCollection.insertOne(users)
            res.send(result)
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("server is maybe runnging")

})

app.listen(port, () => {
    console.log(`server port is running ${port}`)
})