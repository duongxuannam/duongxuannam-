import io from 'socket.io-client';

class _SocketService {
  constructor() {
    this.socket = null;
  }
  connectSocket = () => {
    this.disConnectSocket();
    this.socket = io('http://192.168.1.47:3000/', {});
    console.log('  this.socket ', this.socket);
    return this.socket;
  };

  disConnectSocket = () => {
    if (this.socket) {
      this.socket.disconnect();
    }
  };

  sendStream = (ice, id) => {
    this.socket.emit('NGUOI_DUNG_DANG_KY', { ice, id });
  };

  getSocket = () => {
    return this.socket;
  };
}

const SocketService = new _SocketService();

export default SocketService;
