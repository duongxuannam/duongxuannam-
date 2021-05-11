import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import get from 'lodash/get';
import SocketService from 'services/socketService';
// import { RTCPeerConnection } from 'react-native-webrtc';
import { openCamera } from 'utils/videoCall';

const name = 'Nam' + Math.random();

export const useVideoCall = () => {
  const [localStream, setLocalStream] = useState();
  //   const [remoteStream, setRemoteStream] = useState();
  //   const [cachedRemotePC, setCachedRemotePC] = useState();
  //   const [cachedLocalPC, setCachedLocalPC] = useState();
  const route = useRoute();
  const roomId = get(route, ['params', 'roomId']);
  useEffect(() => {
    SocketService.connectSocket();
    SocketService.joinRoom(roomId, roomId, name);
    SocketService.getRooms(roomId);

    // SocketService.onGetRooms(this.onGetRoomsCallBack);
    // SocketService.onLeaveRoom(this.onLeaveRoomCallBack);
    // SocketService.onJoinRoom(this.onJoinRoomCallBack);

    // SocketService.onAnswerRoomVideo(this.onAnswerRoomVideoCallBack);

    // SocketService.onCandidateRoomVideo(this.onCandidateRoomVideoCallBack);
    // SocketService.onOfferRoomVideo(this.onOfferRoomCallBack);

    return () => {};
  }, [roomId]);

  useEffect(() => {
    const turnOnCamera = async () => {
      const newStream = await openCamera();
      setLocalStream(newStream);
    };
    turnOnCamera();

    return () => {
      // cleanup
    };
  }, []);

  return {
    localStream,
    // remoteStream,
  };
};
