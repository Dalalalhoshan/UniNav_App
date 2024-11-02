import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeNavigation from "../HomeNavigation/HomeNavigation";
import Profile from "../../components/Profile";
import Commuinties from "../../screens/Communities/Commuinties";
import Chat from "../../screens/Chat/Chat";
import Explore from "../../screens/Explore/Explore";
import AddResource from "../../components/AddResource";
import ChatNavigation from "../ChatNavigation/ChatNavigation";
import CommunityNavigation from "../CommuintyNavgation/CommunityNavigation";
import ChatBotNavigation from "../ChatBotNavigation/ChatBotNavigation";
import ProfessorNavigation from "../ProfessorNavigation/ProfessorNavigation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CommunityNavigation1 from "../CommunityNavigation/CommunityNavigation";
const Tab = createBottomTabNavigator();
const MainNavigation = () => {
  const size = 32;
  const color = "#454545";
  const onSelectColor = "#e8b800";
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#252423",
          height: 70,
          paddingBottom: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          elevation: 5,
        },
      }}
    >
      <Tab.Screen
        name="HomeIndex"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              color={focused ? onSelectColor : color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ExploreIndex"
        component={ProfessorNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="search"
              color={focused ? onSelectColor : color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddResourceIndex"
        component={AddResource}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="add"
              color={focused ? onSelectColor : color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ChatBotIndex"
        component={ChatBotNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="robot"
              size={size}
              color={focused ? onSelectColor : color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ChatIndex"
        component={ChatNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="chatbubble"
              color={focused ? onSelectColor : color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
