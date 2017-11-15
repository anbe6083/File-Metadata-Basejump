// init project
var express = require('express');
var app = express();
var multer = require('multer');

var path = require('path');
var morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('public'));
//------------- Start routes-------------
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/submitted', function(req, res) {
  //multer middleware
  upload(req, res, (err) => {
    if(err) throw err;
    else {
      //check to make sure the user inputted a file
      if(req.file === undefined) res.send({error: "no file submitted"});
      else {
        //if it's fine, respond with the file size
        res.send({size: req.file.size});
      }
    }
  });
});

//--------End Routes-----------

//setup Multer
var storage = multer.diskStorage({
  //set the destination and filename
  destination: './public/uploads/',
  filename: function(req, file, callback) {
    //We don't want an error so set it to null. Then, generate the pathname and append the curent time and file extension
    callback(null, file.fieldname + '-' +Date.now() +path.extname(file.originalname));
  }
});

//Initialize Upload
var upload = multer(
  {storage: storage}
).single('myImage');


// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
