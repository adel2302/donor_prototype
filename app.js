const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
//const multer = require('multer'); for uploading files
//const upload = multer();

const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://rym:rym@ds145283.mlab.com:45283/donor-prototype')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: cannot connect to my db'));
db.once('open', () => {
  console.log('connected to my db');
});

app.use(bodyParser.urlencoded({ extended: false }));

const donorSchema = mongoose.Schema({
  donorlastname: String,
  donorfirstname: String,
  donorphone: Number,
  donoraddress: String,
  donorhour: String,
  donormail: String,
  donorcomment: String
});

const Donor = mongoose.model('Donor', donorSchema);


app.set('views', './views');
app.set('view engine', 'ejs');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', urlencodedParser, (req, res) => {
  if(req.body) {
    const formData = req.body;
    const donation = new Donor({ donorlastname: formData.donorlastname,  donorfirstname: formData.donorfirstname, donorphone: formData.donorphone, donoraddress: formData.donoraddress, donorhour: formData.donorhour, donormail: formData.donormail, donorcomment: formData.donorcomment });
    donation.save((err, savedDonation) => {
      if(err) {
        console.log('error: ', err);
      } else {
        console.log(savedDonation);
        res.sendStatus(201);
      }
    });
  } else {
    return res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});