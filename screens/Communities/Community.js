import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { getCommunityById } from "../../src/api/Community";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";

const Community = ({ route }) => {
  const { id, name, image, followers, resources } = route.params;
  const { data } = useQuery({
    queryKey: ["community", id],
    queryFn: () => getCommunityById(id),
  });
  return (
    <View style={styles.container}>
      <View style={styles.followersContainer}>
        <Text style={styles.followers}>{followers}</Text>
        <Text style={styles.followersText}>Followers</Text>
      </View>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    backgroundColor: "#454545",
  },
  image: {
    width: 350,
    height: 200,
    borderRadius: 10,
  },
  name: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    opacity: 0.8,
  },
  followersContainer: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: "#454545",
    padding: 5,
    borderRadius: 10,
  },
  followers: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  followersText: {
    color: "white",
    fontSize: 16,
    opacity: 0.8,
  },
});
