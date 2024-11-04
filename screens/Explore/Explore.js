import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  FlatList,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfessorList from "../../components/ProfessorList";
import CommunityList from "../../components/CommunityList";
import CourseList from "../../components/CourseList";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Define your data source - replace this with your actual data array
  const data = [{ title: "hello" }]; // Add your data items here

  const filteredData = data.filter((item) =>
    item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          onFocus={() => setSelectedItem(null)}
          onChangeText={(text) => {
            console.log(text);
            setSearchQuery(text);
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery && (
          <View
            style={{
              position: "absolute",
              zIndex: 9999,
              top: 60,
              width: "100%",
              backgroundColor: "white",
            }}
          >
            {filteredData.map((item) => (
              <Text>{item.title}</Text>
            ))}
          </View>
        )}
      </View>
      <ScrollView>
        <ProfessorList searchQuery={searchQuery} />
        <CommunityList searchQuery={searchQuery} />
        <CourseList searchQuery={searchQuery} />
      </ScrollView>
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
    position: "relative",
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
