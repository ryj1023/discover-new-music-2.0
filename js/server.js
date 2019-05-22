var express = require('express')
var app = express();
var path = require('path');
// var http = require('http');
// const axios = require('axios');
var bodyParser = require('body-parser')


app.listen(process.env.PORT || 8080);
// console.log('server is running', process.env.PORT);
// app.use( bodyParser.json() );
// app.use(bodyParser.urlencoded({
//    extended: true
//  })); 

var dir = path.join(__dirname, '../')

app.use(express.static(dir));

// app.post('/api/get-access-token', (req, res, next) => {
//    axios.post("https://accounts.spotify.com/api/token", {
//       "grant_type":    "authorization_code",
//      "redirect_uri":  "localhost:8080",
//      "client_secret": "b659abbe6d354267833920c37d88a499",
//      "client_id":     "1477dd268434476fa067b97c618573d5"})
//    .then(data => {
//       res.send('success')
//    })
//    .catch(err => {
//       console.log('err', err)
//       res.send(err)
//    })
//    });

//    app.post('/get-bands-event-data', (req, res) => {
//       axios.get(`https://rest.bandsintown.com/artists/${req.body.data}/events?app_id=ryjay`)
//       .then(result => {
//          res.json(result.data)
//       })
//       .catch(err => {
//          console.log('err', err)
//          res.send(err)
//       })
//    })


