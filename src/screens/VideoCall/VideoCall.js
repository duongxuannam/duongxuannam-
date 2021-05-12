import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { RTCView } from 'react-native-webrtc';
import Spacer from 'components/Spacer';
import { useVideoCall } from './hooks';
import styles from './styles';

export default function VideoCall({ navigation }) {
  const { localStream, remoteStream, room } = useVideoCall();
  console.log('room ', room);
  return (
    <View style={styles.container}>
      <View style={styles.customerContainer}>
        {remoteStream ? (
          <RTCView objectFit="cover" style={styles.rtcBox} streamURL={localStream.toURL()} />
        ) : (
          <View style={styles.loadingContainer}>
            <Text>Dang tai du lieu</Text>
          </View>
        )}
        <View style={styles.actionContainer}>
          <View style={styles.subActionContainer}>
            <TouchableOpacity style={styles.muteButton}>
              <FontAwesomeIcon name="volume-mute" size={20} color="white" />
            </TouchableOpacity>
            <Spacer width={20} />
            <TouchableOpacity style={styles.switchCameraButton}>
              <AntIcon name="videocamera" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {localStream && (
        <View style={styles.localContainer}>
          <RTCView
            objectFit="cover"
            zOrder={1}
            style={styles.rtcBox}
            streamURL={localStream.toURL()}
          />
        </View>
      )}
    </View>
  );
}
