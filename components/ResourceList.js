import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { getResources } from "../src/api/resource";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
const ResourceList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["resources"],
    queryFn: getResources,
  });
  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading resources</Text>;
  const navigation = useNavigation();
  return (
    <View>
      {data?.map((resource) => (
        <TouchableOpacity
          style={styles.resource}
          onPress={() =>
            navigation.navigate("ResourceDetail", { id: resource._id })
          }
        >
          <Text style={styles.resourceTitle}>{resource?.title}</Text>
          <Text>{resource?.resourceType}</Text>
          <Text>{resource?.community}</Text>
          <Text>{resource?.course}</Text>
          <Text>{resource?.createdBy}</Text>
          <Text>{resource?.major}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ResourceList;

const styles = StyleSheet.create({
  resource: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
