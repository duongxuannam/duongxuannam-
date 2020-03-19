import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Detail from '../screens/Detail';

const AuthStack = createStackNavigator();

class Stack extends React.PureComponent {
  render() {
    return (
      <AuthStack.Navigator initialRouteName="Home" headerMode={null}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Detail" component={Detail} />
      </AuthStack.Navigator>
    );
  }
}

export default Stack;
