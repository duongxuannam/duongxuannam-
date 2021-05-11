import { RTCPeerConnection } from 'react-native-webrtc';

const server_URL = 'https://b1fa4722a042.ngrok.io';

class _PeerService {
  constructor() {
    this.peerServer = new RTCPeerConnection(undefined, {
      host: server_URL,
      secure: false,
      // port: 1995,
      path: '/mypeer',
    });
  }
  createConnection = () => {
    const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };
    const connect = new RTCPeerConnection(configuration);
    return connect;
  };
}

const PeerService = new _PeerService();

export default PeerService;
