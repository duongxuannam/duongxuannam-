import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthStack from './AuthStack';
import MainStack from './AuthStack';

const RootStack = createStackNavigator();

class Navigation extends React.PureComponent {
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="AuthStack" headerMode={null}>
          <RootStack.Screen name="AuthStack" component={AuthStack} />
          <RootStack.Screen name="Detail" component={MainStack} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigation;
