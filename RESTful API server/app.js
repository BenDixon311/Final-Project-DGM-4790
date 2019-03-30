const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


const playerRoutes = require('./routes/edit-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false, useNewUrlParser: true}));



app.use('/', playerRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


mongoose.connect('mongodb+srv://Ben:epitaph311@myfirstcluster-1t85r.mongodb.net/players?retryWrites=true', {useNewUrlParser: true})
    .then(result => {
        app.listen(process.env.PORT || 5000);
        console.log("Express server listening");
    }).catch(err => {
        console.log(err);
    })