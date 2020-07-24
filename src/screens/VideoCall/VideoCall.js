import * as React from 'react';
import {View, Text, Button, TouchableOpacity, TextInput} from 'react-native';
import {l10n} from 'languages';
import styles from './styles';

class VideoCall extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      roomId: '',
    };
  }
  render() {
    const {navigation} = this.props;
    const {roomId} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          value={roomId}
          onChangeText={text => this.setState({roomId: text})}
          style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 100}}
        />
        <TouchableOpacity onPress={() => navigation.navigate('RoomVideoCall', {roomId})}>
          <Text>{l10n.enterRoom}</Text>
        </TouchableOpacity>

        <Text>{l10n.or}</Text>
        <TouchableOpacity>
          <Text>{l10n.createRoom}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default VideoCall;
