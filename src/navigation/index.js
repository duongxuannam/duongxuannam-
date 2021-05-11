import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from 'navigation/routes';
import { navigationRef } from './actions';
// import AuthStack from './navigators/AuthStack';
import MainStack from './navigators/MainStack';

const RootStack = createStackNavigator();

class Navigation extends React.PureComponent {
  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator initialRouteName={Routes.MAIN_STACK} headerMode={null}>
          {/* <RootStack.Screen name={Routes.AUTH_STACK} component={AuthStack} /> */}
          <RootStack.Screen name={Routes.MAIN_STACK} component={MainStack} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigation;
