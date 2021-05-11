import React from 'react';
import { View } from 'react-native';

export default function Spacer({ width = 0 }) {
  const styles = { width };

  return <View style={styles} />;
}
