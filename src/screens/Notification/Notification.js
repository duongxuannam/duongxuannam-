import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {l10n} from 'languages';
import styles from './styles';

class Notification extends React.PureComponent {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text>{l10n.hello}</Text>
        <Button title="Go to Notifications" onPress={() => navigation.push('Notification')} />
        <Button title="Push to top" onPress={() => navigation.popToTop()} />
        <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }
}

export default Notification;
