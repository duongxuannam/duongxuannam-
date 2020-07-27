import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

class App extends React.PureComponent {
  render() {
    return (
      <View style={styles.containerView}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Phat')}>
          <Text style={styles.btn}>Phát</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Xem')}>
          <Text style={styles.btn}>Xem</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default App;
