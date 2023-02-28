const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// const app = express();
// app.listen(3000, () => console.log("server Connected on port 3000"));

const dbRoute = 'mongodb+srv://dmunozl:4720adminpassword@4720-cluster.cld7ug6.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbRoute, {
    useNewURLParser: true
});

mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', function(){
    console.log('connected to db!');
});
