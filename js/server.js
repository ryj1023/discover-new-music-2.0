var express = require('express')
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var fetch = require('isomorphic-unfetch')

app.listen(process.env.PORT || 8080);
console.log('server is running', process.env.PORT);
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
   extended: true
 })); 

var dir = path.join(__dirname, '../')

app.use(express.static(dir));

// axios is causing a missing module './common' to not be found when running with heroku. Uninstalling for now

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

   app.post('/get-bands-event-data', (req, res) => {
      fetch(`https://rest.bandsintown.com/artists/${req.body.data}/events?app_id=ryjay`)
      .then(result => {
         // const data = result.json().then(data => console.log('data', data))
         result.json(result.data).then(data => res.json(data))
      })
      .catch(err => {
         console.log('err', err)
         res.send(err)
      })
   })

   app.post('/get-bands-list', (req, res) => {
      fetch(`https://www.tastekid.com/api/similar?q=${req.body.tags}&k=227160-Discover-804XO5GB&verbose=1&type=music&info=1`)
      .then(result => {
         result.json(result).then(data => {
            res.json(data)})
      })
      .catch(err => {
         console.log('err', err)
         res.send(err)
      })
   })


