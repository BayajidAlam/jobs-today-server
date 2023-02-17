const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config();

// middleware 
app.use(cors());
app.use(express.json());

// general api 
app.get('/', (req,res)=>{
  res.send('Server is running');
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@myclaster-1.wxhqp81.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
      // all collection 
      const fresherJobsCollection = client.db('jobsToday').collection('fresherJobs');
      const experiencedJobsCollection = client.db('jobsToday').collection('experiencedJobs');
      const bdTop3Collection = client.db('jobsToday').collection('bdTop3');
      const worldTop3Collection = client.db('jobsToday').collection('worldTop3It');

      // get all fresher job data 
      app.get('/fresherJob', async(req,res)=>{
        const query = {};
        const cursor = await fresherJobsCollection.find(query).toArray()
        res.send(cursor)
      })

      // get all experienced jobs 
      app.get('/experiencedJobs', async(req,res)=>{
        const query = {};
        const result = await experiencedJobsCollection.find(query).toArray();
        res.send(result);
      })

      // get bd top 3 it collection 
      app.get('/bdTop3', async(req,res)=>{
        const query = {}
        const cursor = bdTop3Collection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      })

      // get world top 3 it collection 
      app.get('/worldTop3', async(req,res)=>{
        const query = {}
        const cursor = worldTop3Collection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      })
  }
  finally{

  }
}
run().catch(console.log())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})