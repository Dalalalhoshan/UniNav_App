import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home/home";
import Profile from "../../components/Profile";
import ResourceDetail from "../../components/ResourceDetail";
import CommunityDetails from "../../components/CommunityDetails";
const Stack = createNativeStackNavigator();
import AccountCard from "../../components/AccountsCard";
import AccountDetails from "../../components/AccountDetails";
import AccountList from "../../components/AccountsList";
const HomeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CommunityIndex" component={CommunityDetails} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ResourceDetailIndex" component={ResourceDetail} />
      <Stack.Screen name="AccountCard" component={AccountCard} />
      <Stack.Screen name="AccountDetails" component={AccountDetails} />
      <Stack.Screen name="AccountList" component={AccountList} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
