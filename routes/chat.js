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


exports.CreateChat= function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {    
            console.log('Connection established to', url);
            var collection = db.collection('chat');

            //Create chat
            // var chat = req.body;          
           var chatdetails = {topicId:'',userid:'',message:'Hai How are u ',userStatus:'',datetime:dateTime.toLocaleDateString()+dateTime.toLocaleTimeString()};
           
            // Insert some topic
            collection.insert([chatdetails], function (err, result) {
            if (err) {
                console.log(err);
            }
            else{
                console.log(result);
            }
            });
        }
    });
};
