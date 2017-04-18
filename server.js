
var favicon = require('serve-favicon');
var api = require('./routes/api');
var express = require('express');
var bodyParser = require("body-parser");

var app = express();
var server = require('http').Server(app);
 

app.use('/', express.static(__dirname+ '/www') );
app.use(favicon(__dirname + '/www/images/favicon.ico'));
 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));

app.use('/api', api);

app.set('port', process.env.PORT || 3003);

server.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
});
