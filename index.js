//require express
const express = require('express');
const routes = require('./routes/api');
const mongoose =require('mongoose');

//set up express app
const bodyParser = require('body-parser');
const mongojs = require('mongojs');

const app = express();
const port = 4000;

mongoose.connect('mongodb://localhost/ninjago');
//overwrite the promise
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api',routes);
app.use((err,req,res,next)=>{
  //console.log(err);
  res.status(422).send({error: err.message});
});


//listen for request
app.listen(process.env.port || port, ()=>{
  console.log('Now listening for request');
});
