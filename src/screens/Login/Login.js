import React from 'react';
import { View, Text, Button } from 'react-native';
import { l10n, setLanguage } from 'languages';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';

class HomeScreen extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>{l10n.hello}</Text>
        <Feather allowFontScaling={false} name="activity" size={50} />
        <Button title="Login" />

        <Button title="go detail" onPress={() => navigation.navigate('Detail')} />
        <Button title="fetch data" onPress={this.fetchData} />
        <Button title="set Lang vi" onPress={() => setLanguage('vi')} />
        <Button title="set Lang en" onPress={() => setLanguage('en')} />
      </View>
    );
  }
}

export default HomeScreen;
