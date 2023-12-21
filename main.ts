import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 4632 });

let clients = new Array()
wss.on('connection', function connection(ws: WebSocket) {
  clients.push(ws);
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    clients.forEach( (client) => {
      if (client !== ws) {
        // console.log("DINGDONG", data);
        client.send(data);
      } else {
        // console.log("found the sending client", data);
      }
    });
  });

  // ws.on('disconnect', function message(data) {
  //   clients.remove(ws);
  //   console.log("removed",ws);
  // });

  ws.send('{"message_id":"test"}');
});
