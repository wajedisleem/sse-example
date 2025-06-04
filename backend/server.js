const express = require('express');
const cors = require('cors');
const progressEmitter = require('./progressEmitter');
const worker = require('./worker');

const app = express();
app.use(cors());

let clients = [];

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.push(res);

  req.on('close', () => {
    clients = clients.filter((c) => c !== res);
  });
});

progressEmitter.on('progress', (data) => {
  const event = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach((res) => res.write(event));
});

progressEmitter.on('done', () => {
  const event = `event: done\ndata: {}\n\n`;
  clients.forEach((res) => res.write(event));
});

app.listen(3000, () => {
  console.log('SSE server running on http://localhost:3000/events');
  worker();
});
