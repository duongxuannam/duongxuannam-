import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Routes from 'navigation/routes';
import Login from 'screens/Login';
import RoomVideoCall from 'screens/RoomVideoCall';

const AuthStack = createStackNavigator();

class Stack extends React.PureComponent {
  render() {
    return (
      <AuthStack.Navigator initialRouteName={Routes.LOGIN} headerMode={null}>
        <AuthStack.Screen name={Routes.LOGIN} component={Login} />
      </AuthStack.Navigator>
    );
  }
}

export default Stack;
