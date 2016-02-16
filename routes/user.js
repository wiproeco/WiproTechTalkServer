// grab the things we need
var mongoose = require('mongoose');

var mongodb = require('mongodb');
var nconf = require('nconf');


// tell nconf which config file to use
nconf.env();
nconf.file({ file: 'config.json' });

var url = nconf.get("HOST");
var MongoClient = mongodb.MongoClient;

// Registration for new user 
exports.create = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        else {
            console.log('Connection established to', url);
            var collection = db.collection('user');
            var dateTime = new Date();
            //Create user
            // var user= req.body; //{name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
            var user = { name: req.body.username, email: req.body.email, password: req.body.password, datetime: dateTime.toLocaleDateString()+"  "+ dateTime.toLocaleTimeString()  }
            //var user ={name:'modules',role:['admin','moderator','user'],email:'modules@gmail.com',password:'123',status:'Available',datetime:dateTime};
            // Insert some users
            collection.insert([user], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("inserted one record", result);
                    res.json(result);
                }
            });
        }
    });
};

// get user deatils by id or name 
exports.get = function (req, res) {
    var url1 = require('url');
    var queryObject = url1.parse(req.url, true).query;
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
            var collection = db.collection('user');
            // with _id 
            // collection.find({_id:queryObject.id}).toArray(function (err, result) {
            collection.find({ name: queryObject.name }).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log(result.length, "are found");
                    res.json(result);
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                    res.json(result);
                }
            });
        }
    });
};

// Get user list all 
exports.getUserList = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
            var collection = db.collection('user');

            collection.find().toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log(result.length, "are found");
                    res.json(result);
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                    res.json(result);
                }
            });
        }
    });
};

// Login with user name and password  
exports.authenticate = function (req, res) {
    var url1 = require('url');
    var queryObject = url1.parse(req.url, true).query;
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
            var collection = db.collection('user');

            collection.find({ name: queryObject.username, password: queryObject.password }).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log(result.length, "are found");
                    res.json(result);
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                    res.json(result);
                }
            });
        }
    });
};


// update password for user 
exports.updatePassword = function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
            var collection = db.collection('user');


            collection.update({ _id: mongodb.ObjectID(req.body.id) }, { $set: { password:req.body.password } }, function (err, result) {
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

// Check Username i.e, name 
exports.checkUserName = function (req, res) {
      var url1 = require('url');
    var queryObject = url1.parse(req.url, true).query;
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
            var collection = db.collection('user');


            collection.find({name:queryObject.name}).toArray(function (err, result) {
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


exports.removeuser = function (req,res) {
     MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', url);
            var collection = db.collection('user');


            collection.remove({name:"modules"},function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("removed",result);
                    res.json(result);
                }
            });
        }
    });
}
//if(result.name==queryObject.name) 