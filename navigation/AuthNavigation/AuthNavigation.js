import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Auth/Login";
import Register from "../../screens/Auth/Register";
import NoAuthHome from "../../screens/Home/NoAuthHome";
const Stack = createNativeStackNavigator();
const AuthNavigation = () => {

  return (
    <Stack.Navigator initialRouteName="NoAuthHome" screenOptions={{headerShown: false}}>
      <Stack.Screen name="NoAuthHome" component={NoAuthHome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});