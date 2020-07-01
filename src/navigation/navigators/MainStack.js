import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from 'navigation/routes';
import Home from 'screens/Home';
import Detail from 'screens/Detail';
import Phat from 'screens/Phat';
import Xem from 'screens/Xem';

const MainStack = createStackNavigator();

class Stack extends React.PureComponent {
  render() {
    return (
      <MainStack.Navigator initialRouteName={Routes.HOME}>
        <MainStack.Screen name={Routes.HOME} component={Home} options={{ title: 'Home' }} />
        <MainStack.Screen name={Routes.DETAIL} component={Detail} options={{ title: 'Detail' }} />

        <MainStack.Screen name={'Phat'} component={Phat} options={{ title: 'Phat' }} />

        <MainStack.Screen name={'Xem'} component={Xem} options={{ title: 'Xem' }} />
      </MainStack.Navigator>
    );
  }
}

export default Stack;
