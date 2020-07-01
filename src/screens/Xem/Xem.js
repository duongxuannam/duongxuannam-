import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SocketService from 'services/socketService';
import {
  RTCPeerConnection,
  RTCView,
  RTCSessionDescription,
  RTCIceCandidate,
} from 'react-native-webrtc';

import styles from './styles';

const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };
let peerConnection;

class Phat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      localStream: null,
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
  }

  componentWillUnmount() {
    SocketService.disConnectSocket();
  }

  onCandidateCallBack = (id, candidate) => {
    console.log('onCandidateCallBack e');

    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  };

  onOfferCallBack = async (id, description) => {
    console.log('onOfferCallBack');

    peerConnection = new RTCPeerConnection(configuration);

    await peerConnection.setRemoteDescription(new RTCSessionDescription(description));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    SocketService.answer(id, peerConnection.localDescription);

    peerConnection.onaddstream = e => {
      console.log('onaddstream e');
      if (e.stream && peerConnection !== e.stream) {
        this.setState({
          localStream: e.stream,
        });
      }
    };

    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        console.log('onicecandidate e');

        SocketService.candidate(id, event.candidate);
      }
    };
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
    const { localStream, id } = this.state;
    console.log('lca ', localStream);
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.upid}>
          <Text>popop</Text>
        </TouchableOpacity>
        <Text>{id}</Text>
        <View style={styles.rtcview}>
          {localStream && <RTCView style={styles.rtc} streamURL={localStream.toURL()} />}
        </View>
      </View>
    );
  }
}

export default Phat;
