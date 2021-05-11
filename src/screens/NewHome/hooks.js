import { useState, useEffect } from 'react';
// import PeerService from 'services/peerService';
import SocketService from 'services/socketService';
import { openCamera } from './helpers';

const roomId = 'testRoomId';

export const useVideoCall = () => {
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState([]);

  useEffect(() => {
    const turnOnCamera = async () => {
      const newStream = await openCamera();
      setLocalStream(newStream);
      // PeerService.peerServer.on('open', userId => {});
    };
    turnOnCamera();
    return () => {
      // cleanup
    };
  }, []);

  useEffect(() => {
    const socketListening = () => {
      SocketService.socket.on('user-connected-v2', userId => {
        // const call = PeerService.peerServer.call(userId, localStream);
      });
    };
    socketListening();
    return () => {
      // cleanup
    };
  }, [localStream]);

  // useEffect(() => {
  //   // effect
  //   const peerListening = () => {
  //     PeerService.peerServer.on('open', userId => {
  //       SocketService.socket.emit('join-room-v2', {
  //         userId,
  //         roomId,
  //       });
  //     });
  //     PeerService.peerServer.on('call', call => {
  //       call.answer(localStream);
  //       call.on('stream', stream => {
  //         setRemoteStream(preRemoteStream => {
  //           return [...preRemoteStream, stream];
  //         });
  //       });
  //     });
  //   };
  //   peerListening();
  //   return () => {
  //     // cleanup
  //   };
  // }, [localStream]);

  return {
    localStream,
    remoteStream,
  };
};
