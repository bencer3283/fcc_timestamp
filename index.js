// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log(req.method, " ", req.path, " ", req.ip);
  next();
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date', (req, res) => {
  console.log(req.params.date);
  var time = new Date(req.params.date);
  if (isNaN(time.valueOf())) {
    console.log('timestamp input');
    time = new Date(+req.params.date);
  }
  var response;
  if (isNaN(time.getTime())) {
    response = {error: "Invaid Date"};
  }
  else {
    response = {
      'unix': time.getTime(),
      'utc': time.toUTCString()
    };
  }
  res.json(response);
});

app.get('/api/', (req, res) => {
  let time = new Date();
  res.json({
    'unix': time.getTime(),
    'utc': time.toUTCString()
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
