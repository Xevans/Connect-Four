//server code. we basically wont ever touch this unless we make the game online multiplayer

//all imports, I still havent figured out how to use everything yet but it works for now
import express from 'express';
const app = express();
import http from 'http';
//import io from 'socket.io'  //missing atm
//the 3000 is what port the game is on
var port = process.env.PORT || 3000;
import { publicIp, publicIpv4, publicIpv6 } from 'public-ip';
import { internalIpV6, internalIpV4 } from 'internal-ip';
import isPortReachable from 'is-port-reachable';
import isReachable from 'is-reachable';
//var {math} = require('mathjs');  //missing atm
import path from 'path';
var lastTime = Date.now();
var timeStep = 0;
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// old requires that I cant use anymore but here just in case
// var express = require('express');
// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var port = process.env.PORT || 3000;
// const publicIp = require('public-ip');
// const internalIp = require('internal-ip');
// const isReachable = require('is-reachable');
// var math = require('mathjs');
// var path = require('path')


//default way to make server but I am using a better way to show public ip if port is forwarded
// app.use(express.static(__dirname+'/client'));
// // app.use((req, res) => res.sendFile(`${__dirname}/client/index.html`))
// app.get('/', function(req, res){
//   res.sendFile("/index.html");
// });

(async () => {
  if (await isReachable("localhost:" + port)) {
    console.log("ERROR: port " + port + " is already in use by this server");
    console.log("Terminating Server...");
    process.exit()
  }
  var publipipv4 = await publicIpv4() + ':' + port
  var portforwarded = await isReachable(publipipv4);

  app.use(express.static(__dirname + '/client'));
  app.get('/', function (req, res) { res.sendFile("/index.html"); });
  app.use((req, res) => res.sendFile(`${__dirname}/client/index.html`))

  http.Server(app).listen(port, function () {
    console.log('server online');
  });

  console.log('private ip: ' + await internalIpV4() + ':' + port);

  if (portforwarded) {
    console.log("WARNING: " + publipipv4 + " is already being used in the network");
  } else if (await isReachable(publipipv4)) {
    console.log('public ip: ' + publipipv4);
  } else {
    console.log("WARNING: This server is not port forwarded")
    console.log(publipipv4)
  }
})();

//rest of code here

function playGame(){

    //set server fps
    setInterval(gameLoop, 100);
}

function gameLoop() {

}


playGame();
