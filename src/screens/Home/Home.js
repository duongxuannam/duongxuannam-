import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { navigate } from 'navigation/actions';
import Routes from 'navigation/routes';
import { l10n } from 'languages';
import styles from './styles';

export default function Home({ navigation }) {
  const [roomId, setRoomId] = useState();
  return (
    <View style={styles.container}>
      <TextInput value={roomId} onChangeText={text => setRoomId(text)} style={styles.textInput} />
      <TouchableOpacity onPress={() => navigate(Routes.VIDEO_CALL, { roomId: roomId || 1 })}>
        <Text>{l10n.enterRoom}</Text>
      </TouchableOpacity>

      <Text>{l10n.or}</Text>
      <TouchableOpacity>
        <Text>{l10n.createRoom}</Text>
      </TouchableOpacity>
    </View>
  );
}
