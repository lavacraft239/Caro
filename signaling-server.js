// signaling-server.js
const WebSocket = require('ws');
const express = require('express');
const app = express();
const server = app.listen(3001, () => console.log("Servidor en puerto 3000"));
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on('connection', ws => {
  clients.push(ws);
  ws.on('message', message => {
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});
