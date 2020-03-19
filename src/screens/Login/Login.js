import React from 'react';
import { View, Text, Button } from 'react-native';
import { l10n, setLanguage } from 'languages';
import styles from './styles';

class HomeScreen extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>{l10n.hello}</Text>
        <Button title="Login" />
        <Button title="fetch data" onPress={this.fetchData} />
        <Button title="set Lang" onPress={() => setLanguage('vi')} />
      </View>
    );
  }
}

export default HomeScreen;
