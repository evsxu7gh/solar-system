const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors())

mongoose.connect(process.env.MONGO_URI, {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err) {
    if (err) {
        console.log("GH-200: !! " + err)
    } else {
        console.log("MongoDB Connection Successful");
        console.log("Connected DB:", mongoose.connection.name);
        console.log("Connected Host:", mongoose.connection.host);

        const count = await planetModel.countDocuments({});
        console.log("Planet count:", count);

        const sample = await planetModel.findOne({ id: 2 }).lean();
        console.log("Planet with id=2:", sample);
    }
})

var Schema = mongoose.Schema;

var dataSchema = new Schema({
    name: String,
    id: Number,
    description: String,
    image: String,
    velocity: String,
    distance: String
});
var planetModel = mongoose.model('planets', dataSchema);



app.post('/planet',   function(req, res) {
   // console.log("Received Planet ID " + req.body.id)
    planetModel.findOne({
        id: req.body.id
    }, function(err, planetData) {
        if (err) {
            alert("Ooops, We only have 9 planets and a sun. Select a number from 0 - 9")
            res.send("Error in Planet Data")
        } else {
            res.send(planetData);
        }
    })
})

app.get('/',   async (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});


app.get('/os',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "os": OS.hostname(),
        "env": process.env.NODE_ENV
    });
})

app.get('/live',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "live"
    });
})

app.get('/ready',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "ready"
    });
})

app.listen(3000, () => {
    console.log("Server successfully running on port - " +3000);
})


module.exports = app;
