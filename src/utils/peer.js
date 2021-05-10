import Peer from 'react-native-peerjs';

const peerServer = new Peer(undefined, {
  host: '127.0.0.1',
  secure: false,
  port: 1995,
  path: '/mypeer',
});
