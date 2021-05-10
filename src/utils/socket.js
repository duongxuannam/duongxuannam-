import io from 'socket.io-client';

let socket = null;

export const connectSocket = () => {
  socket = io('127.0.0.1:1995', {});
  return socket;
};

export const disConnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
