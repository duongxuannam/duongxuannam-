import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SocketService from 'services/socketService';
import {
  RTCPeerConnection,
  RTCView,
  RTCSessionDescription,
  RTCIceCandidate,
  mediaDevices,
} from 'react-native-webrtc';

import styles from './styles';

const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };
let peerConnection;

class Phat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      localStream: null,
      remoteStream: null,
      id: null,
    };
    SocketService.connectSocket();
  }

  componentDidMount() {
    SocketService.onBroadcasterInit();
    SocketService.onCandidate(this.onCandidateCallBack);
    SocketService.onOffer(this.onOfferCallBack);
    SocketService.onConnect();
    SocketService.onDisconnectPeer(this.onDisconnectPeerCallBack);
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
  };

  onCandidateCallBack = (id, candidate) => {
    console.log('onCandidateCallBack e');

    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  };

  onOfferCallBack = async (id, description) => {
    console.log('onOfferCallBack');

    peerConnection = new RTCPeerConnection(configuration);
    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        console.log('onicecandidate e');

        SocketService.candidate(id, event.candidate.toJSON());
      }
    };
    peerConnection.onaddstream = e => {
      console.log('onaddstream e');
      if (e.stream && peerConnection !== e.stream) {
        this.setState({
          remoteStream: e.stream,
        });
      }
    };
    await peerConnection.setRemoteDescription(new RTCSessionDescription(description));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    SocketService.answer(id, peerConnection.localDescription);
  };

  onDisconnectPeerCallBack = id => {
    peerConnection.close();
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
