const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var mysql = require('mysql');
var conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'valoshop'
});

conn.connect();

app.use(express.static(__dirname + '/public'));

app.use('/',function(req, res, next){


  var ip = req.headers['x-forwarded-for'] ||
  req.socket.remoteAddress ||
  null;

  console.log(ip);
  next();
});



const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message:"จำนวนรีเควสมากเกินไป เพื่อป้องกันการยิงเว็ปกรุณาทำอีกครั้งในภายหลัง"
})




server.listen(3000, () => {
  console.log('listening on *:3000');
});

app.get('/',limiter,(req, res) => {


    res.sendFile(__dirname + '/public/index.html');
  

  });


  app.get('/test',limiter,(req, res) => {
    res.sendFile(__dirname + '/public/insert.html');
  });


  

  app.get('/datashop',limiter,(req, res) => {


  conn.query('SELECT * FROM shop', function(error, results){
    if ( error ){
      res.status(400).send('Error in database operation');
    } else {
      res.send(results);
    }
});

  });


  app.get('/database',(req,res) =>{

//req.params=params(req); // call the function above ;

   // res.send('id: ' + req.query.id);

  var usernamehere =  req.query.username
  var  passwordhere = req.query.password


    conn.query('SELECT * FROM admin WHERE username = ? AND password = ?',[usernamehere, passwordhere],function(error, results){
      if ( error ){
        console.log("usernamehere error " + usernamehere) ;
        console.log("passwordhere error "+passwordhere) ;

        res.status(400).send('Error in database operation');
      } else {

        res.send(results);
        if(results.length == 1){

          console.log(results)
        }
        
        console.log("usernamehere not " + usernamehere) ;
        console.log("passwordhere not "+passwordhere) ;
      }
  });


})


  app.get('/databasepost',(req,res) =>{

    var usernamehere =  req.query.username
    var  passwordhere = req.query.password
    var  namehere = req.query.name

    var  urlhere = req.query.url

    console.log("urlhere  "+req.length) ;


    conn.query('SELECT * FROM admin WHERE username = ? AND password = ?',[usernamehere, passwordhere],function(error, results){
      if ( error ){
        console.log("usernamehere error1 " + usernamehere) ;
        console.log("passwordhere error1 "+passwordhere) ;

       // res.status(400).send('Error in database operation');
      } else {
        
      //  res.send(results);
        if(results.length == 1){



          conn.query('INSERT INTO admin (username, password) VALUES (?,?)',[namehere, urlhere],function(error, results){
            if ( error ){
              console.log("usernamehere error 2" + namehere) ;
              console.log("passwordhere error 3"+urlhere) ;
              console.log("err error 3"+error) ;
        
            } else {
      
      
                console.log(" finich results")
              
              
              console.log("usernamehere not " + namehere) ;
              console.log("passwordhere not "+urlhere) ;
            }
        });



          console.log(results)
        }
        
        console.log("usernamehere not11 " + namehere) ;
        console.log("passwordhere not 11"+urlhere) ;
      }
  });


})





app.get('/insert',limiter,(req, res) => {
  res.sendFile(__dirname + '/data.html');
});






const  { Client, Intents } = require('discord.js');


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });




  io.on('connection', (socket,req) => {
    console.log('a user connected');
 
  });
  








  io.on('connection', (socket,req) => {

    




    socket.on('chat message',(msg) => {

        console.log('discord');

      console.log('message: ' + msg);



      if(msg == "myvalue1"){
        client.channels.cache.get("960861314585100328").send("<@&961292721983750194>")

      }
      else if(msg == "myvalue2"){
        client.channels.cache.get("960861351360757770").send("<@&961292721983750194>")

      }


    });


  });


client.login('OTYwOTAyMTc4NTM1NTM4Njk5.YkxL5A.1ZERsJwlBJbRrBbZO4_97HcTqrg');


