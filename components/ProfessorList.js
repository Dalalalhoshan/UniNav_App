import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { getProfessors } from "./../src/api/proffesors";
import { useQuery } from "@tanstack/react-query";
import ProfessorCard from "./ProfessorCard";
const ProfessorList = () => {
  const { data } = useQuery({
    queryKey: ["getProfessors"],
    queryFn: getProfessors,
  });
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ProfessorCard item={item} />}
      keyExtractor={(item) => item._id}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
};

export default ProfessorList;
const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: "space-between",
  },
});
