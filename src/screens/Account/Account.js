import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {l10n} from 'languages';
import styles from './styles';

class Account extends React.PureComponent {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text>{l10n.hello}</Text>
        <Button title="Go to Accounts" onPress={() => navigation.push('Account')} />
        <Button title="Push to top" onPress={() => navigation.popToTop()} />
        <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }
}

export default Account;
