const WebSocket = require('ws');

var Sequelize = require('sequelize');
const sequelize   = require('../models').sequelize;
const Signage = require('../models').Signage;

const wsSignage = require('../controller/signageController');
const moment = require('moment');

const jwt    = require('jsonwebtoken');
    

webSockets = {} // userID: webSocket

var id = 0;
  

 //signageList = CONFIG.signageList

//initialize the WebSocket server instance
//const wss = new WebSocket.Server( { port: CONFIG.ws_port } );

const wss = new WebSocket.Server({
    verifyClient: function (info, cb) {
        var token = info.req.url.split('/')[1];

        if (!token)
            cb(false, 401, 'Unauthorized')
        else {
            jwt.verify(token, CONFIG.jwt_encryption_signage, function(err, decoded) {
                // console.log(decoded) // bar
                // console.log("token"+token) // bar
                // console.log(err) // bar

                if (err) {
                    cb(false, 401, 'Unauthorized')
                } else {
                    info.req.user = decoded //[1]
                   cb(true)
                    
                    
                }
      
            });
        }
    },
    port: CONFIG.ws_port 
  
})

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

// const interval = setInterval(function ping() {
//    console.log("ping all each ws")
//     wss.clients.forEach(function each(ws) {
        
//       if (ws.isAlive === false)
//       {
//         console.log("ws dead "+ws.signage_id)
//         delete webSockets[ws.signage_id]

//          Signage.update(
//           { last_connect: sequelize.fn('NOW')
//           },
//           { where: {  
//                 signage_id:ws.signage_id
//                     } }
//         )

//         return ws.terminate();
//       } 

//       ws.send(JSON.stringify({
//           "type": "checking",
//           "success": true,
//           "message": 'every 15 seconds',
//           "responseTime" : moment().tz('Asia/Kuala_Lumpur').format('YYYY-MM-DD HH:mm:ss')

//       }))

    
//       ws.isAlive = false;
//       ws.ping(noop);
//     });
//   }, 15000);

wss.on('connection', async function connection(ws, req) {

    // console.log(`WS Server listening on port ` + CONFIG.ws_port);
    // console.log(req.headers['sec-websocket-key'])
    // console.log(ws._socket.remoteAddress)
    // console.log(moment().format('YYYY-MM-DD HH:mm:ss'))

    ws.triggerDelete = true; 
    
    let signage = req.user;
    if (ws.readyState === ws.OPEN) {
      //  console.log("show signageList "+JSON.stringify(signageList[signage.signage_id]))

      ws.isAlive = true;
      ws.on('pong', heartbeat);

      let headerKey = req.headers['sec-websocket-key'];
      //ws information
      ws.signage_id = signage.signage_id;
      ws.ws_id = headerKey;
      ws.name = signage.name;
      ws.company_id = signage.company_id;

      if(webSockets[signage.signage_id])
      {
        ws.triggerDelete = false; 

        console.log("conflit show webSockets"+Object.keys(webSockets).length)
        ws.send(JSON.stringify({
            "success": false,
            message: 'login by another device'
        }))
        return ws.close();
      // return webSockets[signage.signage_id].close();


      }else
      {
        
        webSockets[signage.signage_id] = ws;

        Signage.update(
          { 
            last_connect: sequelize.fn('NOW')
          },
          { where: {  
                signage_id:signage.signage_id
           } }
        )


        console.log("show webSockets"+Object.keys(webSockets).length)
      }
      
      
     // signageList[signage.signage_id] = {signage_id:signage.signage_id,name:signage.name} 
    //  console.log("new webSockets"+req.headers['sec-websocket-key'])
    //  console.log("length of webSockets"+Object.keys(webSockets).length)
    
        

    //  function intervalFunc() {
    //     //console.log("signage.signage_id "+signage.signage_id)

    //     //console.log("signage.headers "+req.headers['sec-websocket-key'])
    //     if(webSockets[signage.signage_id])
    //     {
    //             webSockets[signage.signage_id].send(JSON.stringify({
    //               "type": "checking",
    //                 "success": true,
    //                 message: 'every 15 seconds',
    //                 responseTime : moment().tz('Asia/Kuala_Lumpur').format('YYYY-MM-DD HH:mm:ss')
    //             }))

    //             // webSockets[signage.signage_id].send(JSON.stringify({
    //             //     "type": "getAds",
    //             //     "data":{ "path": "www.google.com"}          
    //             // }))

               
    //     }
                
        
    //     }


     //setInterval(intervalFunc, 15000);

      webSockets[signage.signage_id].send(JSON.stringify({
          "success": true,
          "type":"login",
          "message": 'connect to tm signage server',
          "responseTime" : moment().tz('Asia/Kuala_Lumpur').format('YYYY-MM-DD HH:mm:ss')
      }))

   
    }

    



    //connection is up, listen to the message
    ws.on('message', function incoming(message) {
        var message = message;
          console.log('received: %s', message);

          manage_message( message, ws,signage.signage_id);
        
    });
    
    ws.on('close', function close() {
    //  delete wsclient[wskey + "-" + req.headers['sec-websocket-key']];
    

      //delete signageList[signage.signage_id]
      if(ws.triggerDelete)
      {
        
          console.log("triggerDelete "+ws.triggerDelete )

          delete webSockets[signage.signage_id]
          console.log("close webSockets"+signage.signage_id)

        //  manage_message( message, null,signage.signage_id);

          return Signage.update(
            { last_connect: sequelize.fn('NOW')
            },
            { where: {  
                  signage_id:signage.signage_id
                      } }
          )
        

      }else
      {   
        //duplicate login wont edit current list
        console.log("triggerDelete "+ws.triggerDelete )
          webSockets[signage.signage_id] = ws;
      }
      

    // console.log("show webSockets"+JSON.stringify(webSockets))
      console.log("show webSockets"+Object.keys(webSockets).length)
      //     console.log( remoteIP.split(':')[3] + "-" + req.headers['sec-websocket-key'] +' Disconnected' );
    });

});


function manage_message( message, ws, signage_id ) {

  //log the received message from client
  console.log('received message: %s', message);
  console.log('received client: %s', JSON.stringify(signage_id));
  try {
      var message = JSON.parse(message)
      switch ( message.type ) {
          
          case "testing": 
             ws.send( JSON.stringify( {"success": true, "message": "return successful"} ) );
          break;
          
          case "getAdsList": 
              wsSignage.wsGetAdsList(message.type,signage_id,ws)
          break;

          case "getSignageSettings": 
            wsSignage.wsGetSignageSettings(message.type,signage_id,ws)
          break;

          case "uploadData": 
              wsSignage.uploadData(message.type,signage_id,ws,message)
          break;

          case "editSignageSpec": 
              wsSignage.editSignageSpec(message.type,signage_id,ws,message)
          break;

          case "closeSocket": 
            wsSignage.closeConnection(message.type,signage_id,ws,message)
          break;

          case "updateError": 
            wsSignage.updateError(message.type,signage_id,ws,message)
          break;

          case "getSchedule": 
            wsSignage.getSchedule(message.type,signage_id,ws,message)
          break;


          default:
              ws.send( JSON.stringify( {"success": false, "message": "Message type Not Found"} ) );
          break;
      }
  }catch(err){
      console.log(err);
      ws.send(JSON.stringify({"success": false, "message": "Message Invalid."}));
  }
}


