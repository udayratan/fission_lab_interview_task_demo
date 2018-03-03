var express = require('express'),
    //set an instance of exress
    app = express(),
    //require the path nodejs module
    http = require('http'),
    path = require("path"),
    Router = require('./router');

var server = http.createServer(app),
    port = process.env.PORT || '3000';

app.use(express.static('views'));
app.set('views', __dirname + '/views');
app.set('port', port);
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use('/', Router);
server.listen(port, (err, ConnetionEstablishes) => {
    if (err) console.log("Server failed to start");
    console.log("Server Running on Port " + port);
});