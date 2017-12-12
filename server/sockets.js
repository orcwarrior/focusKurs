import socketio from 'socket.io'

import {call} from "./controllers/call";
import {getStatus} from "./controllers/getStatus";

export default function (expressServer) {
  let io = socketio.listen(expressServer);
  io.on('connection', (socket) => {
    socket.on('call', async (data, callback) => {
      let callResponse = await call(data.userNumber, data.otherNumber);
      callback(callResponse); // Returns exactly same thing as the http call service
    });

    socket.on('status', async (dialerId, callback) => {
      let statusesResponse = await getStatus(dialerId);
      callback(statusesResponse);
    });
  });
}
