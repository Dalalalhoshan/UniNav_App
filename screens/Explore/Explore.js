import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import ProfessorNavigation from "../../navigation/ProfessorNavigation/ProfessorNavigation";
import ProfessorList from "../../components/ProfessorList";
import UserList from "../../components/UserList";
const Explore = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#ccc"
        placeholder="Search"
      />
      <ProfessorList style={styles.professorList} />
      <UserList style={styles.userList} />
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a", // Dark background color
    padding: 20,
    flexGrow: 1,
  },
  text: {
    color: "#E94560", // Text color
  },
  button: {
    backgroundColor: "#F9D342", // Button color
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#2E2E3E",
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
  professorList: {
    marginTop: 20,
    flex: 1,
  },
  userList: {
    marginTop: 20,
    flex: 1,
  },
});
