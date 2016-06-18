var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var passport      = require('passport');

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


var connectionString = 'mongodb://127.0.0.1:27017/cs5610summer';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);

require ("./server/test/app.js")(app); //Add or delete message to test mongodb working
require ("./server/meanBlog/app.js")(app); //MEAN Blog
require ("./server/webBuilder/app.js")(app); //WebBuilder Blog
require("./server/todos/todo.js")(app); // todo
require("./server/authentication/app.js")(app); //authentication



var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);