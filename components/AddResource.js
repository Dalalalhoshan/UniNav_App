import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { getResourceTypes } from "../src/api/resourceType";
import { createResource } from "../src/api/resource";
const AddResource = () => {
  const navigate = useNavigation();
  const [resource, setResource] = useState({});
  const { mutate: CreateResourceMutation } = useMutation({
    mutationKey: ["createResource"],
    mutationFn: createResource,
    onSuccess: () => {
      navigate.goBack();
    },
  });
  const { data: resourceTypes } = useQuery({
    queryKey: ["resourceTypes"],
    queryFn: () => getResourceTypes(),
  });
  return (
    <View style={{ backgroundColor: "#454545", flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Resource</Text>

        <TextInput
          placeholder="Title"
          style={styles.input}
          onChangeText={(value) => setResource({ ...resource, title: value })}
        />
        <TextInput
          placeholder="URL"
          style={styles.input}
          onChangeText={(value) => setResource({ ...resource, url: value })}
        />
        <SelectList
          placeholder="Type"
          boxStyles={styles.selectList}
          setSelected={(value) => setResource({ ...resource, type: value })}
          data={resourceTypes?.map((resourceType) => ({
            label: resourceType.name,
            value: resourceType.name,
          }))}
          save="value"
        />
        <TouchableOpacity
          title="Create"
          style={styles.button}
          onPress={() => CreateResourceMutation(resource)}
        >
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddResource;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "#454545",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    width: 350,
    borderRadius: 10,
    color: "white",
  },
  selectList: {
    width: 350,
    color: "white",
  },
  button: {
    backgroundColor: "#e8b800",
    padding: 10,
    borderRadius: 20,
    height: 50,
    width: 200,
    alignItems: "center",
    marginTop: 20,
    position: "sticky",
    bottom: 0,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 20,
    marginTop: 50,
  },
});
