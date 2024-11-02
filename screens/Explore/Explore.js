import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfessorList from "../../components/ProfessorList";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#E94560"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search professors..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={(text) => {
            console.log(text);
            const lowerCaseSearch = text.toLowerCase();
            setSearchQuery(lowerCaseSearch);
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <ProfessorList searchQuery={searchQuery} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
    flexGrow: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E2E3E",
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 8,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchIcon: {
    marginRight: 10,
    color: "#e8b800",
  },
  searchInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
  text: {
    color: "#e8b800", // Text color
  },
  button: {
    backgroundColor: "#4b3f72", // Button color
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default Explore;
