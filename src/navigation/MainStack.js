import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';

const MainStack = createStackNavigator();

class Stack extends React.PureComponent {
  render() {
    return (
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen name="Home" component={Home} options={{ title: 'Dep trai' }} />
      </MainStack.Navigator>
    );
  }
}

export default Stack;
