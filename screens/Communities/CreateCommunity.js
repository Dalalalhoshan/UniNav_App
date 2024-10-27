import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createCommunity } from "../../src/api/Community";

const CreateCommunity = () => {
  const [community, setCommunity] = useState({});
  const { mutate: createCommunityMutate } = useMutation({
    mutationKey: ["createCommunity"],
    mutationFn: createCommunity,
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Community Name"
        onChangeText={(text) => setCommunity({ ...community, name: text })}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => createCommunityMutate(community)}
      >
        <Text>Create Community</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateCommunity;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#f0a500",
    padding: 10,
    borderRadius: 5,
  },
});
