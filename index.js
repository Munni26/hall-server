const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5000

const app = express()

app.use(bodyParser.json())
app.use(cors())


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://kuetProject:tazneen89@cluster0.491qx.mongodb.net/kuetProject?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("kuetProject").collection("hall");
  const single = client.db("kuetProject").collection("singleHall");
  const hall1 = client.db("kuetProject").collection("mujibHall");
  const hall2 = client.db("kuetProject").collection("rashidHall");
  const hall3 = client.db("kuetProject").collection("fazlulHall");
  const hall4 = client.db("kuetProject").collection("jahanAliHall");
  const hall5 = client.db("kuetProject").collection("lalanHall");
  const hall6 = client.db("kuetProject").collection("rokeyaHall");
  console.log("connect")

  app.post('/addBooking', (req, res) => {
    const booking = req.body;
    console.log(booking)
    collection.insertOne(booking)
      .then(result => {
        console.log(result)
        console.log('one book added')
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/singleEkushey', (req, res) => {
    collection.find({})
      .toArray((err, document) => {
        res.send(document);
        //console.log(document)
      })
  })
  //hall data
  app.post('/allData', (req, res) => {
    const info = req.body;
    console.log(info)
    single.insertMany(info)
      .then(result => {
        //console.log(result);
      })
  })

  app.get('/datas', (req, res) => {
    single.find({})
      .toArray((err, document) => {
        res.send(document);
      })
  })
  app.get('/datas/:name', (req, res) => {
    console.log(req.params.name);
    single.find({ name: req.params.name })
      .toArray((err, document) => {
        res.send(document[0]);
        //console.log(document[0])

      })
  })

  app.post('/mujibHall', (req, res) => {
    hall1.insertOne(req.body)
      .then(result => {
        //console.log(result)
        //console.log('one book added')
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/singleMujib', (req, res) => {
    hall1.find({})
      .toArray((err, document) => {
        res.send(document);
        //console.log(document)
      })
  })

  app.post('/rashidHall', (req, res) => {
    hall2.insertOne(req.body)
      .then(result => {
        console.log(result)
        console.log('one book added')
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/singleRashid', (req, res) => {
    hall2.find({})
      .toArray((err, document) => {
        res.send(document);
        //console.log(document)
      })
  })

  app.post('/fazlulHall', (req, res) => {
    hall3.insertOne(req.body)
      .then(result => {
        console.log(result)
        console.log('one book added')
        res.send(result.insertedCount > 0)
      })
  })

  app.post('/jahanAliHall', (req, res) => {
    hall4.insertOne(req.body)
      .then(result => {
        console.log(result)
        console.log('one book added')
        res.send(result.insertedCount > 0)
      })
  })

  app.post('/lalanHall', (req, res) => {
    hall5.insertOne(req.body)
      .then(result => {
        console.log(result)
        console.log('one book added')
        res.send(result.insertedCount > 0)
      })
  })

  app.post('/rokeyaHall', (req, res) => {
    hall6.insertOne(req.body)
      .then(result => {
        console.log(result)
        console.log('one book added')
        res.send(result.insertedCount > 0)
      })
  })
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)