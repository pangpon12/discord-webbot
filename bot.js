const SocketAntiSpam  = require('socket-anti-spam')
const socketio = require('socket.io').listen(8080)

// Redis is not needed, but can be used
const redis = require('redis')
const client = redis.createClient()

const socketAntiSpam = new SocketAntiSpam({
  banTime:            30,         // Ban time in minutes
  kickThreshold:      2,          // User gets kicked after this many spam score
  kickTimesBeforeBan: 1,          // User gets banned after this many kicks
  banning:            true,       // Uses temp IP banning after kickTimesBeforeBan
  io:                socketio,  // Bind the socket.io variable
  redis:              client,      // Redis client if you are sharing multiple servers
})

// Call functions with created reference 'socketAntiSpam'
socketAntiSpam.event.on('ban', data => {
  // Do stuff
})