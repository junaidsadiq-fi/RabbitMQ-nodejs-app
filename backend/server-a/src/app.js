const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { receiveTaskDone } = require("../rabbit-utils/receiveTaskDone.js");
const WebSocket = require('ws');
const http = require('http');
const rabbitHost = process.env.RABBIT_HOST || 'localhost';

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
module.exports.wss = wss;

wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
});

app.use(
  cors({
    origin: [
      'http://localhost:3009',
      'http://localhost:8081',
      'http://localhost:3001',
      'http://localhost:3000',
    ],
    
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use(bodyParser.json());

// Import routes
require("./api/routes/routes")(app); 

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  receiveTaskDone( rabbitHost, "done_queue", wss);
});
