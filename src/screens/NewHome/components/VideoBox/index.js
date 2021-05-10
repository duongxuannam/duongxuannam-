import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';

export default function VideoBox({ style, active, icon, name, local, stream }) {
  const [statusActive, setStatusActive] = useState(active);
  const iconBox = { backgroundColor: statusActive ? '#368DFC' : '#9E9B9D' };
  const nameBox = local ? styles.nameBoxCurrent : styles.nameBox;
  const nameText = name || 'You an cut';
  return (
    <View style={[styles.container, style]}>
      <View style={nameBox}>
        <Text numberOfLines={2} style={styles.nameText}>
          {nameText}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setStatusActive(currentState => !currentState)}
        style={[styles.iconBox, iconBox]}
      >
        <Icon icon={icon} />
      </TouchableOpacity>

      {stream && <RTCView style={styles.rtcBox} streamURL={stream.toURL()} />}
    </View>
  );
}

function Icon({ icon }) {
  if (icon === 'volume') {
    return <FontAwesomeIcon name="volume-mute" size={20} color="white" />;
  }
  return <AntIcon name="videocamera" size={20} color="white" />;
}
