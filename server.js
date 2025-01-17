// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res)=>{
  let unix = new Date().getTime();
  let utc = `${new Date()}`
  utc = utc.slice(0,3) + ", " + utc.slice(8,11)  + utc.slice(4,8) + utc.slice(11,28);
  res.json({unix, utc})
});
app.get("/api/:date", (req, res) =>{
  const date = req.params.date; 
  if(Number.isNaN(parseInt(date))){ 
    return res.json({error: "Invalid Date"})
  }
  let unix = new Date(date).getTime() || parseInt(date);
  let utc = parseInt(date) != date ? `${new Date(date)}`: `${new Date(parseInt(date))}`
  utc = utc.slice(0,3) + ", " + utc.slice(8,11)  + utc.slice(4,8) + utc.slice(11,28);
  res.json({unix, utc})
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
