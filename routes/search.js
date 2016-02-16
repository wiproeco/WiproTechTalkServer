// grab the things we need
var mongoose = require('mongoose');

var mongodb = require('mongodb');
var nconf = require('nconf');


// tell nconf which config file to use
nconf.env();
nconf.file({ file: 'config.json' });

var url = nconf.get("HOST");
var MongoClient = mongodb.MongoClient;

var dateTime = new Date();



exports.searchByUser = function(req,res){
    MongoClient.connect(url,function(err,db){
       if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {    
            console.log('Connection established to', url);
            var collection = db.collection('topic');
            
            collection.find({createdByuser:req.body.createdByuser}).toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else if (result.length) {
                console.log('Found:', result);
                res.json(result);
            } else {
                console.log('No document(s) found with defined "find" criteria!');
                res.json(result);                
         }}); 
  }}); 
      
};