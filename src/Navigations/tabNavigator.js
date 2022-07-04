import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Job from '../Pages/jobs/job';
import {HP, WP} from '../Assets/config/screen-ratio';
import fontFamily from '../Assets/config/fontFamily';
import {MsgNavigator} from './msgNavigator';
import Profile from '../Pages/profile/profile';
import Notification from '../Pages/notification/notification';
import CreateJob from '../Pages/createJob/createJob';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import {Icons} from '../Assets/Icons';

const Tab = createBottomTabNavigator();
const Styles = StyleSheet.create({
  tab: {
     position: 'absolute',
    height: HP(10),
    width: WP(100),
  },
  txt: {
    fontFamily: fontFamily.semi_bold,
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },
  icon: {
    alignSelf: 'center',
  },
  iconView: {
    width: 25,
    borderRadius: WP(2),
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const TabNavigator = () => {
  return (
    <Tab.Navigator
    initialRouteName= "Profile"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#2B47FC',
        tabBarStyle: {
          ...Styles.tab,
        },
      }}>
      <Tab.Screen
        name="Jobs"
        component={Job}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{...Styles.iconView}}>
          {focused ?
             <Icons.Briefcase_Focused/> : <Icons.Briefcase/>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{...Styles.iconView}}>
          {focused ?
             <Icons.Bell_Focused/> : <Icons.Bell/>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Messaging"
        component={MsgNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{...Styles.iconView}}>
              {focused ?
             <Icons.Mail_Focused/> : <Icons.Mail/>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{...Styles.iconView}}>
          {focused ?
             <Icons.User_Focused/> : <Icons.User/>}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
