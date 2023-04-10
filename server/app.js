const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Data = require('./models');
// const app = express();
// app.listen(3000, () => console.log("server Connected on port 3000"));

const dbRoute = 'mongodb+srv://dmunozl:4720adminpassword@4720-cluster.cld7ug6.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbRoute, {
    useNewURLParser: true
});

mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
mongoose.connection.once('open', function(){
    console.log('connected to db!');

    const app = express();
    const router = express.Router();

    router.get('/user', (req, res) => {
        Data.find()
          .then(data => {
            return res.json({ success: true, data });
          })
          .catch(err => {
            return res.json({ success: false, error: err });
          });
      });

      router.post('/user', (req, res) => {
        const { email } = req.body;
        if (email.length === 0) {
          return res.json({ success: false, error: 'Invalid input' });
        }
        const data = new Data({ email });
        data.save()
          .then(() => {
            return res.json({ success: true });
          })
          .catch(err => {
            return res.json({ success: false, error: err });
          });
      });

      router.put('/user/:id', (req, res) => {
        const { email } = req.body;
        Data.findByIdAndUpdate(req.params.id, { email })
          .then(() => {
            return res.json({ success: true });
          })
          .catch(err => {
            return res.json({ success: false, error: err });
          });
      });

      router.delete('/user/:id', (req, res) => {
        Data.findByIdAndRemove(req.params.id)
          .then(() => {
            return res.json({ success: true });
          })
          .catch(err => {
            return res.json({ success: false, error: err });
          });
      });

    app.use(cors());
    app.use(bodyParser.json());

    app.use('/api', router);

    app.listen(3001, () => console.log('Listening to port 3001'));
});
