import React from 'react';
import { View, SafeAreaView, Button } from 'react-native';
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';
import SocketService from 'services/socketService';
import styles from './styles';

const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };
const localPC = new RTCPeerConnection(configuration);

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      localStream: undefined,
      remoteStream: undefined,
      cachedLocalPC: undefined,
      cachedRemotePC: undefined,
      isMuted: false,
      customerId: props?.route?.params?.params?.customerId,
      myId: props?.route?.params?.params?.myId,
    };
  }

  componentDidMount() {
    this.openMyCamera();
    this.sendStream();
  }

  sendStream = async () => {
    const { myId } = this.state;
    localPC.onicecandidate = event =>
      event.candidate
        ? SocketService.sendStream(event.candidate, myId)
        : console.log('Sent All Ice');
  };

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

  showMyFace = async () => {};

  startCall = async () => {
    const { remoteStream, localStream } = this.state;
    // You'll most likely need to use a STUN server at least. Look into TURN and decide if that's necessary for your project
    const configuration = { iceServers: [{ url: 'stun:stun.l.google.com:19302' }] };
    const localPC = new RTCPeerConnection(configuration);
    const remotePC = new RTCPeerConnection(configuration);

    // could also use "addEventListener" for these callbacks, but you'd need to handle removing them as well
    localPC.onicecandidate = e => {
      try {
        console.log('localPC icecandidate:', e.candidate);
        if (e.candidate) {
          remotePC.addIceCandidate(e.candidate);
        }
      } catch (err) {
        console.error(`Error adding remotePC iceCandidate: ${err}`);
      }
    };
    remotePC.onicecandidate = e => {
      try {
        console.log('remotePC icecandidate:', e.candidate);
        if (e.candidate) {
          localPC.addIceCandidate(e.candidate);
        }
      } catch (err) {
        console.error(`Error adding localPC iceCandidate: ${err}`);
      }
    };
    remotePC.onaddstream = e => {
      console.log('remotePC tracking with ', e);
      if (e.stream && remoteStream !== e.stream) {
        console.log('RemotePC received the stream', e.stream);
        this.setState({
          remoteStream: e.stream,
        });
      }
    };

    // AddTrack not supported yet, so have to use old school addStream instead
    // newStream.getTracks().forEach(track => localPC.addTrack(track, newStream));
    localPC.addStream(localStream);
    try {
      const offer = await localPC.createOffer();
      console.log('Offer from localPC, setLocalDescription');
      await localPC.setLocalDescription(offer);
      console.log('remotePC, setRemoteDescription');
      console.log('here ', localPC.localDescription);

      await remotePC.setRemoteDescription(localPC.localDescription);
      console.log('RemotePC, createAnswer');
      const answer = await remotePC.createAnswer();
      console.log(`Answer from remotePC: ${answer.sdp}`);
      console.log('remotePC, setLocalDescription');
      await remotePC.setLocalDescription(answer);
      console.log('localPC, setRemoteDescription');
      await localPC.setRemoteDescription(remotePC.localDescription);
    } catch (err) {
      console.error(err);
    }
    this.setState({ cachedLocalPC: localPC, cachedRemotePC: remotePC });
  };

  switchCamera = () => {
    const { localStream } = this.state;
    localStream.getVideoTracks().forEach(track => track._switchCamera());
  };

  // Mutes the local's outgoing audio
  toggleMute = () => {
    const { remoteStream, localStream } = this.state;
    if (!remoteStream) {
      return;
    }
    localStream.getAudioTracks().forEach(track => {
      console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
      track.enabled = !track.enabled;
      this.setState({ isMuted: !track.enabled });
    });
  };

  closeStreams = () => {
    const { cachedLocalPC, localStream, remoteStream, cachedRemotePC } = this.state;
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    if (cachedRemotePC) {
      cachedRemotePC.removeStream(remoteStream);
      cachedRemotePC.close();
    }

    this.setState({
      localStream: undefined,
      remoteStream: undefined,
      cachedRemotePC: undefined,
      cachedLocalPC: undefined,
    });
  };
  render() {
    const { localStream, remoteStream, isMuted } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {!localStream && <Button title="Click to start stream" onPress={this.startLocalStream} />}
        {localStream && (
          <Button title="Click to start call" onPress={this.startCall} disabled={!!remoteStream} />
        )}

        {localStream && (
          <View style={styles.toggleButtons}>
            <Button title="Switch camera" onPress={this.switchCamera} />
            <Button
              title={`${isMuted ? 'Unmute' : 'Mute'} stream`}
              onPress={this.toggleMute}
              disabled={!remoteStream}
            />
          </View>
        )}

        <View style={styles.rtcview}>
          {localStream && <RTCView style={styles.rtc} streamURL={localStream.toURL()} />}
        </View>
        <View style={styles.rtcview}>
          {remoteStream && <RTCView style={styles.rtc} streamURL={remoteStream.toURL()} />}
        </View>
        <Button title="Click to stop call" onPress={this.closeStreams} disabled={!remoteStream} />
      </SafeAreaView>
    );
  }
}
export default App;
