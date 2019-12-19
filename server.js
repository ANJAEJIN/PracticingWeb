const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 5000;

var mongoose = require('mongoose');

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://127.0.0.1:27017/tutorial');

const multer = require('multer');
const upload = multer({dest: "./upload"})

app.use('/image', express.static(`${__dirname}/upload`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var Customer = require('./models/customer');

var router = require('./routes')(app, Customer, upload)

app.listen(port,() => console.log(`Node is listening on port ${port} by Express`))