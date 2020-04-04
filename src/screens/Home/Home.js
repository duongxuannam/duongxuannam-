import React from 'react';
import { View, Text, Button } from 'react-native';
import { l10n, setLanguage } from 'languages';
import { resetAuthStack } from 'navigation/actions';
import styles from './styles';

class HomeScreen extends React.PureComponent {
  fetchData = async () => {
    const { getProfile } = this.props;
    await getProfile();
  };
  render() {
    const { navigation, userName } = this.props;
    console.log('user ', userName);
    return (
      <View style={styles.container}>
        <Text>{l10n.hello}</Text>
        <Button title="Go to Details" onPress={() => navigation.navigate('Detail')} />
        <Button title="fetch data" onPress={this.fetchData} />
        <Button title="set Lang" onPress={() => setLanguage('vi')} />

        <Button title="resetAuthStack   " onPress={() => resetAuthStack()} />
      </View>
    );
  }
}

export default HomeScreen;
