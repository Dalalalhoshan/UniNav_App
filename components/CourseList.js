import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { getAllCourses } from "./../src/api/courses";
import { useQuery } from "@tanstack/react-query";
import CourseCard from "./CourseCard";

const CourseList = ({ searchQuery }) => {
  const { data } = useQuery({
    queryKey: ["getAllCourses", searchQuery],
    queryFn: () => getAllCourses(searchQuery),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Courses</Text>

      <FlatList
        data={data}
        renderItem={({ item }) => <CourseCard item={item} />}
        keyExtractor={(item) => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.container, { gap: 10 }]}
      />
    </View>
  );
};

export default CourseList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,

    paddingVertical: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E2E3E",
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
  },
  searchIcon: {
    marginRight: 10,
    color: "#e8b800",
  },
  searchInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
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
