import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import throttle from 'lodash/throttle';
import api from 'api/profileApi';
// import socket, { disConnectSocket, connectSocket } from 'services/socketService';

import SocketService from 'services/socketService';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      arrUserInfo: [],
    };
  }

  goHome = item => () => {
    const { navigation } = this.props;
    const myId = SocketService.getSocket()?.id;
    navigation.navigate('MainStack', {
      screen: 'Home',
      params: {
        screen: 'Sound',
        params: { customerId: item, myId },
      },
    });
  };
  componentDidMount() {
    SocketService.connectSocket();
    this.fetchData();
  }

  componentWillUnmount() {
    SocketService.disConnectSocket();
  }

  fetchData = async () => {
    const rs = await api.testApi();
    this.setState({
      arrUserInfo: rs.arrUserInfo,
    });
  };

  render() {
    const { arrUserInfo } = this.state;
    const myId = SocketService.getSocket()?.id;
    console.log('sec ', myId);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity style={{ marginVertical: 30 }} onPress={this.fetchData}>
          <Text>fetchData</Text>
        </TouchableOpacity>
        {arrUserInfo.length > 0 &&
          arrUserInfo.map(item => {
            if (item === myId) {
              return null;
            }
            return (
              <TouchableOpacity
                onPress={this.events.goHome(item)}
                style={{
                  marginVertical: 20,
                }}
                key={item}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
    );
  }

  events = {
    goHome: item => throttle(this.goHome(item), 500),
  };
}

export default Login;
