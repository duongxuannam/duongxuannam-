import io from 'socket.io-client';

class _SocketService {
  constructor() {
    this.socket = null;
    this.id = null;
  }
  connectSocket = () => {
    this.disConnectSocket();
    // this.socket = io('https://api-playhard.herokuapp.com/', {
    //   forceNew: true,
    // });
    this.socket = io('https://9fd6b5cf46e7.ngrok.io/', {
      forceNew: true,
    });
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

  // room video

  joinRoom = (roomId, nameRoom, name) => {
    this.socket.emit('joinRoom', roomId, nameRoom, name);
  };
  onJoinRoom = cb => {
    this.socket.on('joinRoom', id => cb(id));
  };
  leaveRoom = roomId => {
    this.socket.emit('leaveRoom', roomId);
  };
  onLeaveRoom = cb => {
    this.socket.on('leaveRoom', id => cb(id));
  };

  getRooms = roomId => this.socket.emit('getRooms', roomId);

  onGetRooms = cb => {
    this.socket.on('getRooms', rooms => cb(rooms));
  };

  candidateRoomVideo = (candidate, id) => {
    this.socket.emit('candidateRoomVideo', candidate, id);
  };

  onCandidateRoomVideo = cb => {
    this.socket.on('candidateRoomVideo', (id, candidate) => cb(id, candidate));
  };

  offerRoomVideo = (description, id) => {
    this.socket.emit('offerRoomVideo', description, id);
  };

  onOfferRoomVideo = cb => {
    this.socket.on('offerRoomVideo', (id, description) => cb(id, description));
  };

  answerRoomVideo = (description, id) => {
    this.socket.emit('answerRoomVideo', description, id);
  };

  onAnswerRoomVideo = cb => {
    this.socket.on('answerRoomVideo', (id, description) => cb(id, description));
  };
}

const SocketService = new _SocketService();

export default SocketService;
