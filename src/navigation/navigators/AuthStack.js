import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Routes from 'navigation/routes';
import Login from 'screens/Login';
import VideoCall from 'screens/VideoCall';
import RoomVideoCall from 'screens/RoomVideoCall';

const AuthStack = createStackNavigator();

class Stack extends React.PureComponent {
  render() {
    return (
      <AuthStack.Navigator initialRouteName={Routes.VIDEO_CALL} headerMode={null}>
        <AuthStack.Screen name={Routes.LOGIN} component={Login} />
        <AuthStack.Screen name={Routes.VIDEO_CALL} component={VideoCall} />
        <AuthStack.Screen name={Routes.ROOM_VIDEO_CALL} component={RoomVideoCall} />
      </AuthStack.Navigator>
    );
  }
}

export default Stack;
