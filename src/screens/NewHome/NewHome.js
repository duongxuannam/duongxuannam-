import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useVideoCall } from './hooks';
import VideoBox from './components/VideoBox';
import styles from './styles';

export default function Home() {
  const { localStream } = useVideoCall();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <VideoBox active icon="camera" local stream={localStream} />
        </View>
        <View style={styles.row2}>
          <ScrollView horizontal>
            <View style={styles.row}>
              <View style={styles.boxVideoList}>
                <VideoBox active icon="camera" name="Nam" />
              </View>
              <View style={styles.boxVideoList}>
                <VideoBox icon="volume" name="Người mà ai cũng biết là ai" />
              </View>
              <View style={styles.boxVideoList}>
                <VideoBox active icon="camera" name="Loser" />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
