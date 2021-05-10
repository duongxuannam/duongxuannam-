import Peer from 'react-native-peerjs';
import { mediaDevices } from 'react-native-webrtc';

const server_URL = '127.0.0.1';

class _PeerService {
  constructor() {
    this.peerServer = new Peer(undefined, {
      host: server_URL,
      secure: false,
      // port: 1995,
      path: '/mypeer',
    });

    this.peerServer.on('error', console.log('error'));
  }
}

const PeerService = new _PeerService();

export default PeerService;
