import io from 'socket.io-client';

class _SocketService {
  constructor() {
    this.socket = null;
    this.id = null;
  }
  connectSocket = () => {
    this.disConnectSocket();
    this.socket = io('https://api-playhard.herokuapp.com/', {});
    return this.socket;
  };

  disConnectSocket = () => {
    if (this.socket) {
      this.socket.disconnect();
    }
  };

  broadcasterInit = () => this.socket.emit('broadcaster');

  onBroadcasterInit = () => {
    this.socket.on('broadcaster', () => {
      this.socket.emit('watcher');
    });
  };

  onWatcher = cb => {
    this.socket.on('watcher', id => cb(id));
  };

  candidate = (id, candidate) => {
    this.socket.emit('candidate', id, candidate);
  };

  onCandidate = cb => {
    this.socket.on('candidate', (id, candidate) => cb(id, candidate));
  };

  offer = (id, description) => {
    this.socket.emit('offer', id, description);
  };

  onOffer = cb => {
    this.socket.on('offer', (id, description) => cb(id, description));
  };

  answer = (id, description) => {
    this.socket.emit('answer', id, description);
  };

  onAnswer = cb => {
    this.socket.on('answer', (id, description) => cb(id, description));
  };

  onConnect = () => {
    this.socket.on('connect', () => {
      this.id = this.socket.id;
      this.socket.emit('watcher');
    });
  };

  onConnectBroadCast = () => {
    this.socket.on('connect', () => {
      this.id = this.socket.id;
    });
  };

  onDisconnectPeer = cb => {
    this.socket.on('disconnectPeer', id => cb(id));
  };
  // socket.on('candidate', (id, message) => {
  //   socket.to(id).emit('candidate', socket.id, message);
  // });

  getId = () => {
    return this.id;
  };

  getSocket = () => {
    return this.socket;
  };
}

const SocketService = new _SocketService();

export default SocketService;
