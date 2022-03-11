const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;

const port = process.env.PORT || 5000;

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nbdi3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();

        const database = client.db('edonEduSystem');
        const coursesCollection = database.collection('courses');
        const instructorsCollection = database.collection('instructors');


        // Get Courses API
        app.get('/courses', async (req, res) => {
            const cursor = coursesCollection.find({});
            const course = await cursor.toArray();
            res.send(course);
        });

        // Get Courses API
        app.get('/instructors', async (req, res) => {
            const cursor = instructorsCollection.find({});
            const instructor = await cursor.toArray();
            res.send(instructor);
        });

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello Edon edu System')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})