import { useState, useEffect, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import get from 'lodash/get';
import SocketService from 'services/socketService';
import { RTCPeerConnection, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';
import { openCamera } from 'utils/videoCall';

const peerConnections = {};
const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };

export const useVideoCall = () => {
  const [localStream, setLocalStream] = useState();
  const [remoteStreams, setRemoteStreams] = useState({});
  const [room, setRoom] = useState();

  const route = useRoute();
  const roomId = get(route, ['params', 'roomId']);
  const name = get(route, ['params', 'name']);

  const onGetRoomsCallBack = roomParam => {
    setRoom(roomParam);
  };

  const onLeaveRoomCallBack = useCallback(idUserLeave => {
    setRoom(preRoom => {
      const users = get(preRoom, ['users'], {});
      const user = users[idUserLeave];
      if (user) {
        delete users[idUserLeave];
      }
      const newRoom = {
        ...preRoom,
        users,
      };
      setRoom(newRoom);
    });
    Object.keys(peerConnections).forEach(function (key) {
      peerConnections[key] && peerConnections[key].close();
      peerConnections[key] && delete peerConnections[key];
    });
    setRemoteStreams({});
  }, []);

  const onJoinRoomCallBack = useCallback(
    async (idUserJoin, roomParam) => {
      setRoom(roomParam);
      const peerConnection = new RTCPeerConnection(configuration);
      peerConnections[idUserJoin] = peerConnection;
      peerConnections[idUserJoin].addStream(localStream);
      peerConnections[idUserJoin].onicecandidate = event => {
        try {
          if (event.candidate) {
            SocketService.candidateRoomVideo(event.candidate.toJSON(), idUserJoin);
          }
        } catch (e) {
          console.error(`Error adding iceCandidate: ${e}`);
        }
      };

      const offer = await peerConnections[idUserJoin].createOffer();
      await peerConnections[idUserJoin].setLocalDescription(new RTCSessionDescription(offer));
      SocketService.offerRoomVideo(peerConnections[idUserJoin]?.localDescription, idUserJoin);
    },
    [localStream]
  );

  const onCandidateRoomVideoCallBack = (idSender, candidate) => {
    peerConnections[idSender].addIceCandidate(new RTCIceCandidate(candidate));
  };

  const onOfferRoomCallBack = useCallback(
    async (idSender, description) => {
      const peerConnection = new RTCPeerConnection(configuration);
      peerConnections[idSender] = peerConnection;
      peerConnections[idSender].addStream(localStream);
      peerConnections[idSender].onicecandidate = event => {
        if (event.candidate) {
          SocketService.candidateRoomVideo(event.candidate.toJSON(), idSender);
        }
      };
      peerConnections[idSender].onaddstream = e => {
        if (e.stream && peerConnections[idSender] !== e.stream) {
          const newStream = e.stream;
          setRemoteStreams(preStream => {
            const newRemoteStreams = { ...preStream, [idSender]: newStream };
            return newRemoteStreams;
          });
        }
      };
      await peerConnections[idSender].setRemoteDescription(new RTCSessionDescription(description));
      const answer = await peerConnections[idSender].createAnswer();
      await peerConnections[idSender].setLocalDescription(new RTCSessionDescription(answer));
      SocketService.answerRoomVideo(peerConnections[idSender].localDescription, idSender);
    },
    [localStream]
  );

  const onAnswerRoomVideoCallBack = (idSender, description) => {
    peerConnections[idSender].onaddstream = e => {
      if (e.stream && peerConnections[idSender] !== e.stream) {
        const newStream = e.stream;
        setRemoteStreams(preStream => {
          const newRemoteStreams = { ...preStream, [idSender]: newStream };
          return newRemoteStreams;
        });
      }
    };
    peerConnections[idSender].setRemoteDescription(new RTCSessionDescription(description));
  };

  const exitRoom = useCallback(() => {
    Object.keys(peerConnections).forEach(function (key) {
      peerConnections[key] && peerConnections[key].close();
      peerConnections[key] && delete peerConnections[key];
    });
    setLocalStream(null);
    setRemoteStreams({});
  }, []);

  useEffect(() => {
    SocketService.connectSocket();

    // setup room
    SocketService.joinRoom(roomId, roomId, name);
    SocketService.getRoom(roomId);
    SocketService.onGetRoom(onGetRoomsCallBack);
    SocketService.onLeaveRoom(onLeaveRoomCallBack);

    //setup stream
    SocketService.onCandidateRoomVideo(onCandidateRoomVideoCallBack);
    SocketService.onAnswerRoomVideo(onAnswerRoomVideoCallBack);
    return () => {
      SocketService.leaveRoom(roomId);
      SocketService.disConnectSocket();
      exitRoom();
    };
  }, [roomId, name, exitRoom, onLeaveRoomCallBack]);

  useEffect(() => {
    //setup stream
    SocketService.onJoinRoom(onJoinRoomCallBack);
    SocketService.onOfferRoomVideo(onOfferRoomCallBack);
  }, [onJoinRoomCallBack, onOfferRoomCallBack]);

  useEffect(() => {
    const turnOnCamera = async () => {
      const newStream = await openCamera();
      setLocalStream(newStream);
    };
    turnOnCamera();
  }, []);

  const customerStreams = [];

  for (var remoteStream in remoteStreams) {
    if (remoteStreams.hasOwnProperty(remoteStream)) {
      customerStreams.push(remoteStreams[remoteStream]);
    }
  }

  return {
    localStream,
    remoteStreams,
    room,
    customerStreams,
  };
};
