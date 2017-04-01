var express = require('express')
var app = express();
var path = require('path');

app.listen(process.env.PORT || 8080);
console.log('server is running');

var dir = path.join('../', __dirname)

app.use(express.static(dir));

console.log(dir)





