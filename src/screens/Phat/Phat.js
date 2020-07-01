import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SocketService from 'services/socketService';
import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';

import styles from './styles';

const peerConnections = {};

class Phat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      localStream: null,
      remoteStream: null,
      id: null,
    };
    SocketService.connectSocket();
    SocketService.onWatcher(this.onWatcherCallBack);
    SocketService.onAnswer(this.onAnswerCallBack);
    SocketService.onCandidate(this.onCandidateCallBack);
    SocketService.onDisconnectPeer(this.onDisconnectPeerCallBack);
    SocketService.onConnectBroadCast();
  }

  componentDidMount() {
    this.openMyCamera();
  }

  componentWillUnmount() {
    SocketService.disConnectSocket();
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
    SocketService.broadcasterInit();
  };

  onWatcherCallBack = async id => {
    const { localStream } = this.state;
    const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };
    const peerConnection = new RTCPeerConnection(configuration);
    peerConnections[id] = peerConnection;
    peerConnection.addStream(localStream);
    peerConnection.onicecandidate = event => {
      try {
        if (event.candidate) {
          SocketService.candidate(id, event.candidate);
        }
      } catch (e) {
        console.error(`Error adding iceCandidate: ${e}`);
      }
    };
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    SocketService.offer(id, peerConnection?.localDescription);
  };

  onAnswerCallBack = (id, description) => {
    peerConnections[id].setRemoteDescription(new RTCSessionDescription(description));
  };

  onCandidateCallBack = (id, candidate) => {
    peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
  };

  onDisconnectPeerCallBack = id => {
    peerConnections[id] && peerConnections[id].close();
    peerConnections[id] && delete peerConnections[id];
  };

  upid = () => {
    const id = SocketService.getId();
    this.setState({
      id,
    });
  };

  render() {
    const { localStream, id, remoteStream } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.upid}>
          <Text>popop</Text>
        </TouchableOpacity>
        <Text>{id}</Text>
        <View style={styles.rtcview}>
          {localStream && <RTCView style={styles.rtc} streamURL={localStream.toURL()} />}
        </View>
        <View style={styles.rtcview}>
          {remoteStream && <RTCView style={styles.rtc} streamURL={remoteStream.toURL()} />}
        </View>
      </View>
    );
  }
}

export default Phat;
