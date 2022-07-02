import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Messages from '../Pages/messages/messages';
import Convo from '../Pages/conservation/conservation';

const Stack = createStackNavigator();
export const MsgNavigator = () => (
  <Stack.Navigator
    initialRouteName="Messages"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Messages" component={Messages} />
    {/* <Stack.Screen name="Convo" component={Convo} /> */}
  </Stack.Navigator>
);
