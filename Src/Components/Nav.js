import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../Features/Main';

const Stack = createStackNavigator();

const Nav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {backgroundColor: 'tomato'},
      }}>
      <Stack.Screen
        component={Main}
        name="Main"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default Nav;
