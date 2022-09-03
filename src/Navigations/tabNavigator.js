import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Job from "../Pages/jobs/job";
import { HP, WP } from "../Assets/config/screen-ratio";
import fontFamily from "../Assets/config/fontFamily";
import Profile from "../Pages/profile/profile";
import Notification from "../Pages/notification/notification";
import Messages from "../Pages/messages/messages";
import Discover from "../Pages/Discover/discover";
import { FontAwesome5 } from "@expo/vector-icons";
import { Icons } from "../Assets/Icons";
import * as Haptics from "expo-haptics";

const Tab = createBottomTabNavigator();
const Styles = StyleSheet.create({
  tab: {
    position: "absolute",
    height: HP(10),
    width: WP(100),
  },
  txt: {
    fontFamily: fontFamily.semi_bold,
    textAlign: "center",
    fontSize: 12,
    marginTop: 5,
  },
  icon: {
    alignSelf: "center",
  },
  iconView: {
    width: 25,
    borderRadius: WP(2),
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#2B47FC",
        tabBarStyle: {
          ...Styles.tab,
        },
      }}
    >
      <Tab.Screen
        name="Jobs"
        component={Job}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ ...Styles.iconView }}>
              {focused ? <Icons.Briefcase_Focused /> : <Icons.Briefcase />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ ...Styles.iconView }}>
              {focused ? (
                <FontAwesome5 name="search" size={24} color="blue" />
              ) : (
                <FontAwesome5 name="search" size={24} color="black" />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ ...Styles.iconView }}>
              {focused ? <Icons.Mail_Focused /> : <Icons.Mail />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ ...Styles.iconView }}>
              {focused ? <Icons.Bell_Focused /> : <Icons.Bell />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ ...Styles.iconView }}>
              {focused ? <Icons.User_Focused /> : <Icons.User />}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
