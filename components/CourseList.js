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

const CourseList = () => {
  const { data } = useQuery({
    queryKey: ["getAllCourses"],
    queryFn: getAllCourses,
  });

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <CourseCard item={item} />}
      keyExtractor={(item) => item._id}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
};

export default CourseList;

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: "space-between",
  },
});
