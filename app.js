//JULIA TRAM NGOC HOANG 30640288 WEEK 7
//packages
const express = require("express");
//const mongodb = require("mongodb");
const mongoose = require('mongoose');
//const path = require('path');
//const morgan = require("morgan");
//const bodyParser = require('body-parser');
//const ejs = require('ejs');
let app = express();

//Referencing Schemas
const senders = require ('./routers/sender');
const parcels = require('./routers/parcel');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.listen(8080);

mongoose.connect('mongodb://localhost:27017/parcels',function(err){
    if(err){
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});

//Configuiring Endpoints
app.get('/sender',function(req,res){
    res.json({'name':'Max', 'age':25});
})
//Sender REST endpoints 
app.get('/senders', senders.getAll);
app.post('/senders', senders.createOne);
app.get('/senders/:id', senders.getOne);
app.put('/senders/:id', senders.updateOne);
app.post('/senders/:id/parcels', senders.addParcel);
app.delete('/senders/:id', senders.deleteOne);

//Parcel REST endpoints
app.get('/parcels', parcels.getAll);
app.post('/parcels', parcels.createOne);
app.get('/parcels/:id', parcels.getOne);
app.put('/parcels/:id', parcels.updateOne);
app.delete('/parcels/:id', parcels.deleteOne);