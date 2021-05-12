import * as React from 'react';
import { View, Text } from 'react-native';
import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import isEmpty from 'lodash/isEmpty';
import SocketService from 'services/socketService';

import styles from './styles';

const peerConnections = {};
const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };

class RoomVideoCall extends React.Component {
  constructor(props) {
    super(props);
    const roomId = props.route.params.roomId || 'rong';
    this.state = {
      roomId,
      name: new Date().getSeconds(),
      localStream: null,
      remoteStream: {},
      peerConnections: {},
      isMuted: null,
    };
    SocketService.connectSocket();
  }

  componentDidMount() {
    const { roomId, name } = this.state;
    SocketService.joinRoom(roomId, roomId, name);
    SocketService.getRooms(roomId);

    SocketService.onGetRooms(this.onGetRoomsCallBack);
    SocketService.onLeaveRoom(this.onLeaveRoomCallBack);
    SocketService.onJoinRoom(this.onJoinRoomCallBack);

    SocketService.onAnswerRoomVideo(this.onAnswerRoomVideoCallBack);

    SocketService.onCandidateRoomVideo(this.onCandidateRoomVideoCallBack);
    SocketService.onOfferRoomVideo(this.onOfferRoomCallBack);

    this.openMyCamera();
  }
  shouldComponentUpdate(_, nextStates) {
    return true;
  }
  componentWillUnmount() {
    const { roomId } = this.state;
    SocketService.leaveRoom(roomId);
    SocketService.disConnectSocket();
    this.onExitScreen();
  }

  openMyCamera = async () => {
    // isFront will determine if the initial camera should face user or environment
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? 'front' : 'environment';
    const videoSourceId = devices.find(
      device => device.kind === 'videoinput' && device.facing === facing
    );
    const facingMode = isFront ? 'user' : 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    this.setState({
      localStream: newStream,
    });
  };

  onGetRoomsCallBack = room => console.log('cbOnGetRooms ', room);

  onLeaveRoomCallBack = id => {
    const { roomId, remoteStream } = this.state;
    SocketService.getRooms(roomId);

    peerConnections[id] && peerConnections[id].close();
    peerConnections[id] && delete peerConnections[id];

    remoteStream[id] && delete remoteStream[id];
    this.setState({
      remoteStream,
    });
  };

  onExitScreen = () => {
    Object.keys(peerConnections).forEach(function (key) {
      peerConnections[key] && peerConnections[key].close();
      peerConnections[key] && delete peerConnections[key];
    });
    this.setState({
      localStream: null,
      remoteStream: {},
    });
  };

  // o san trong phong

  onJoinRoomCallBack = async id => {
    console.log('flowww ');
    const { localStream } = this.state;
    const peerConnection = new RTCPeerConnection(configuration);
    peerConnections[id] = peerConnection;
    // peerConnection.getRemoteStreams()[0].enabled = false;
    // peerConnection.getStats().then(data => conosle.log(data)).catch(e => console.log(e))
    peerConnection.addStream(localStream);
    peerConnection.onicecandidate = event => {
      console.log('flowww 2');

      try {
        if (event.candidate) {
          SocketService.candidateRoomVideo(event.candidate.toJSON(), id);
        }
      } catch (e) {
        console.error(`Error adding iceCandidate: ${e}`);
      }
    };
    console.log('flowww 3');

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

    SocketService.offerRoomVideo(peerConnection?.localDescription, id);
  };

  onAnswerRoomVideoCallBack = (id, description) => {
    console.log('flowww 4');

    const { remoteStream } = this.state;
    peerConnections[id].onaddstream = e => {
      console.log('flowww 5');

      if (e.stream && peerConnections[id] !== e.stream) {
        console.log('flowww 6');

        const newStream = e.stream;
        const newRemoteStream = { ...remoteStream, [id]: newStream };
        this.setState({
          remoteStream: newRemoteStream,
        });
      }
    };
    console.log('flowww 7');

    peerConnections[id].setRemoteDescription(new RTCSessionDescription(description));
  };

  // flow chung

  onCandidateRoomVideoCallBack = (id, candidate) => {
    console.log('Thang nay la thagn chung');

    peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
  };

  // moi vao phong

  onOfferRoomCallBack = async (id, description) => {
    console.log('only you');
    const { localStream } = this.state;
    const peerConnection = new RTCPeerConnection(configuration);
    peerConnections[id] = peerConnection;
    peerConnection.addStream(localStream);
    peerConnection.onicecandidate = event => {
      console.log('only you 2');

      if (event.candidate) {
        console.log('only you 3');

        SocketService.candidateRoomVideo(event.candidate.toJSON(), id);
      }
    };
    peerConnection.onaddstream = e => {
      console.log('only you 4');

      const { remoteStream } = this.state;

      if (e.stream && peerConnection !== e.stream) {
        console.log('only you 5');

        const newStream = e.stream;
        const newRemoteStream = { ...remoteStream, [id]: newStream };
        this.setState({
          remoteStream: newRemoteStream,
        });
      }
    };
    console.log('only you 6');

    await peerConnection.setRemoteDescription(new RTCSessionDescription(description));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));
    SocketService.answerRoomVideo(peerConnection.localDescription, id);
  };

  render() {
    const { roomId, localStream, remoteStream } = this.state;
    return (
      <View style={styles.container}>
        <Text>{roomId}</Text>
        <View style={styles.rtcview}>
          {localStream && <RTCView style={styles.rtc} streamURL={localStream.toURL()} />}
        </View>

        {!isEmpty(remoteStream) &&
          Object.entries(remoteStream).map(([key, value], i) => {
            return (
              <View style={styles.rtcview} key={key}>
                {value && <RTCView style={styles.rtc} streamURL={value.toURL()} />}
              </View>
            );
          })}
      </View>
    );
  }
}

export default RoomVideoCall;
