//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var nconf = require('nconf');
var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
//var routes = require('./routes');
var user=require('./routes/user');
var topic=require('./routes/topic');
var chat=require('./routes/chat');
var search = require('./routes/search');
var bodyParser = require('body-parser')
var socketserver=require('./routes/SocketServer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });

// all environments
app.set('port', process.env.PORT || 3113);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', routes);

// tell nconf which config file to use
nconf.env();
nconf.file({ file: 'config.json' });

var url = nconf.get("HOST");
var MongoClient = mongodb.MongoClient;


//User
app.get('/login',user.authenticate)
app.post('/CreateUser',user.create); 
app.get('/getuser',user.get);
app.get('/userList',user.getUserList);
app.post('/updatePassword',user.updatePassword);
app.get('/checkUserName',user.checkUserName);
app.post('/removeuser',user.removeuser);
//topics 
app.post('/createTopic',topic.create);
app.get('/getTopic',topic.getTopic);
app.get('/getTopicList',topic.getTopicList);
app.post('/updateTopic',topic.updateTopic);
//chat
app.post('/createChat',chat.CreateChat);
//search
app.post('/searchTopicByUser',search.searchByUser);
//Get active user's list
//app.get('/activeusers',socketserver.activeuserlist);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port') +' ✔');
});
socketserver.createSocket();
