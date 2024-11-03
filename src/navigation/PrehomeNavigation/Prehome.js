import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseSelectionScreen from "../../../screens/SelectionScreens/CourseSelection";
import ProfessorSelectionScreen from "../../../screens/SelectionScreens/ProfessorSelection";
import CommunitySelectionScreen from "../../../screens/SelectionScreens/CommunitySelection";

const Stack = createNativeStackNavigator();

const Prehome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="selectCourses" component={CourseSelectionScreen} />
      <Stack.Screen
        name="selectProfessors"
        component={ProfessorSelectionScreen}
      />
      <Stack.Screen
        name="selectCommunity"
        component={CommunitySelectionScreen}
      />
    </Stack.Navigator>
  );
};

export default Prehome;

const styles = StyleSheet.create({});
