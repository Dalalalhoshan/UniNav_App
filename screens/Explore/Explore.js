import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfessorNavigation from "../../navigation/ProfessorNavigation/ProfessorNavigation";
import ProfessorList from "../../components/ProfessorList";

const Explore = () => {
  return (
    <View>
      <ProfessorList />
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({});
