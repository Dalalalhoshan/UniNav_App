import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NAVIGATION from "..";
import Home from "../../../screens/Main/Home/Home";

const Stack = createNativeStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={NAVIGATION.HOME.HOME} component={Home} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});
