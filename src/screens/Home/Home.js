import React from 'react';
import { View, Text, Button } from 'react-native';
import { l10n, setLanguage } from 'languages';
import styles from './styles';

function HomeScreen({ navigation, user, getProfile }) {
  console.log('user', user);
  async function fetchData() {
    await getProfile();
  }
  return (
    <View style={styles.container}>
      <Text>{l10n.hello}</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Detail')} />
      <Button title="fetch data" onPress={() => fetchData()} />
      <Button title="set Lang" onPress={() => setLanguage('vi')} />
    </View>
  );
}

export default HomeScreen;
