var server = require('http').createServer();
var io = require('socket.io')(server);
var usersockets = {};
var registeredusers = [];

exports.createSocket=function(req,res)
{
    io.sockets.on('connection', function (socket) {        

    var socketUserid='';
    socket.on('regUser', function (result) {
            socketUserid = result.userid;
            usersockets[socketUserid] = socket;
            registeredusers.push(socketUserid);
            console.log('Established connection for '+ socketUserid);
            activeusers();            
        });
    
     var activeusers=function(){
        for(var i=0; i<registeredusers.length;i++)
            {
                var sendusers = usersockets[registeredusers[i]];
                sendusers.emit('activeusers', registeredusers);
            }
     };
  
    
      var msg = '';
        socket.on('clientNotification', function (result) {
            msg = result.data +"," + result.fromuser;
            console.log(result.data);
            var recieverSocket = usersockets[result.name];
            recieverSocket.emit('ListenNotification', msg );
        });
    
        socket.on('BroadcastNotification', function (result) {
            msg = result.data;
            console.log(result.data);
        
            for(var i=1; i<registeredusers.length;i++)
            {
                var recieverSocket = usersockets[registeredusers[i]];
                recieverSocket.emit('receiveBroadcastNotification', msg);
            }
    });
  });
    server.listen(3000);
    console.log("SocketIO is listening on port 3000 ✔");
};

exports.activeuserlist=function(){
    return registeredusers;
}

