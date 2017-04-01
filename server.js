var express = require('express')
var app = express();

app.listen(process.env.PORT || 8080);
console.log('server is running');


var dir = '/Users/ryanjohnson/projects/Discover-The-Music-Heroku/'

app.use(express.static(dir));

console.log(dir)





