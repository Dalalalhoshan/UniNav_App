import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Auth/Login";
import Register from "../../screens/Auth/Register";
import NoAuthHome from "../../screens/Home/NoAuthHome";
import CourseSelectionScreen from "../../screens/SelectionScreens/CourseSelection";
import ProfessorSelectionScreen from "../../screens/SelectionScreens/ProfessorSelection";
import CommunitySelectionScreen from "../../screens/SelectionScreens/CommunitySelection";
import MainNavigation from "../MainNavigation/MainNavigation";
const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="NoAuthHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="NoAuthHome" component={NoAuthHome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="selectCourses" component={CourseSelectionScreen} />
      <Stack.Screen
        name="selectProfessors"
        component={ProfessorSelectionScreen}
      />
      <Stack.Screen
        name="selectCommunity"
        component={CommunitySelectionScreen}
      />
      {/* <Stack.Screen name="Home" component={MainNavigation} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
