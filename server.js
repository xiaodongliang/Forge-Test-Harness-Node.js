
var favicon = require('serve-favicon');
var ForgeRoute = require('./routes/ForgeRoute');
var express = require('express');
var bodyParser = require("body-parser");

var app = express();

app.use('/', express.static(__dirname+ '/www') );
app.use(favicon(__dirname + '/www/images/favicon.ico'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));

app.use('/ForgeRoute', ForgeRoute);

app.set('port', process.env.PORT || 3002);

var server = app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
});
