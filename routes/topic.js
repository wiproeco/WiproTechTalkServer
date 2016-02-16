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

// Creating the topic by user 
exports.create = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
            var collection = db.collection('topic');
            //  var usercollection = db.collection('user');

            //Create topic            
            //   var obj={subject:req.body.subject,userid:req.body.userid,topicType:req.body.topicType,createdByuser:req.body.createdByuser,image:req.body.image,datetime:dateTime}
            var usertopic = { subject: 'Where do i find jquery library in vs 2012?', userid: '56b9949e2b6e154c597d606b',createdByuser: 'midhun', topicType: 'blog',
            content:[{name:'sameer',comments:"go to nuget manager and download."},{name:'midhun',comments:'thanks '}],  image: "", 
            createdByon: dateTime.toLocaleDateString()+"  "+ dateTime.toLocaleTimeString() }

            // Insert some topic
            collection.insert([usertopic], function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                    res.json(result);
                }
            });
        }
    });
};

//Get topic by subject name
exports.getTopic = function (req, res) {
    var url1 = require('url');
    var queryObject = url1.parse(req.url, true).query;
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
            var collection = db.collection('topic');

            collection.find({ subject: { $regex: ".*" + queryObject.subject + ".*" } }).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log('Found:', result);
                    res.json(result);
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                     res.json(result);
                }
            });
        }
    });
};

// Get Topic List 
exports.getTopicList = function (req, res) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
            var collection = db.collection('topic');

            collection.find().toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log('Found:', result);
                    res.json(result);
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                     res.json(result);
                }
            });
        }
    });
};

// Updating the topic 
exports.updateTopic = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
            var collection = db.collection('topic');

            collection.update({ _id: mongodb.ObjectID(req.body.id) }, { $set: { subject: req.body.subject, topicType: req.body.topicType } }, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    res.json(result);
                }
            });
        }
    });
};