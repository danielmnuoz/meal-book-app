const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');


const dbRoute = 'mongodb+srv://dmunozl:4720adminpassword@4720-cluster.cld7ug6.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbRoute, {
    useNewURLParser: true
});
mongoose.connection.on('error', console.error.bind(console, 'connection error: '));



mongoose.connection.once('open', function(){
    console.log('connected to db!');

    const app = express();  
    app.use(cors());
    app.use(express.json());
    app.use('/api/auth', userRoutes);   
    app.listen(3001, () => console.log('Listening to port 3001'));
});
