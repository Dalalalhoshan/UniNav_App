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
    // <FlatList
    //   data={data}
    //   renderItem={({ item }) => <CommunityCard item={item} />}
    //   keyExtractor={(item) => item._id}
    //   numColumns={2}
    //   columnWrapperStyle={styles.columnWrapper}
    // />
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {data?.map((item) => (
          <CommunityCard item={item} key={item._id} />
        ))}
      </View>
    </ScrollView>
  );
};

export default CommunityList;

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: "space-between",
  },
});
