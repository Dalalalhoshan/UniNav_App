import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAllCommunities } from "../src/api/Community";
import UserContext from "../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import CommunityCard from "./CommunityCard";

const CommunityList = () => {
  const { data } = useQuery({
    queryKey: ["getAllCommunities"],
    queryFn: getAllCommunities,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Communities</Text>

      <FlatList
        data={data}
        renderItem={({ item }) => <CommunityCard item={item} />}
        keyExtractor={(item) => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.container, { gap: 10 }]}
      />
    </View>
  );
};

export default CommunityList;

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
