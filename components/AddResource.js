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
import { getAllCommunities } from "../src/api/Community";
import { getAllCourses } from "../src/api/courses";
import { createResource } from "../src/api/resource";
import * as DocumentPicker from "expo-document-picker";
import { useQueryClient } from "@tanstack/react-query";
const AddResource = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigation();
  const [resource, setResource] = useState({});
  const { mutate: CreateResourceMutation } = useMutation({
    mutationKey: ["createResource"],
    mutationFn: createResource,
    onSuccess: () => {
      navigate.goBack();
      queryClient.invalidateQueries("getNotifications");
    },
  });
  const { data: resourceTypes } = useQuery({
    queryKey: ["resourceTypess"],
    queryFn: () => getResourceTypes(),
  });
  const { data: communities } = useQuery({
    queryKey: ["communities"],
    queryFn: () => getAllCommunities(),
  });
  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getAllCourses(),
  });
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow all file types
        copyToCacheDirectory: false,
      });

      if (result.assets && result.assets[0]) {
        const file = result.assets[0].uri;
        console.log(file);
        setResource({ ...resource, file: file });
      }
    } catch (err) {
      console.log("Document picking error:", err);
    }
  };
  return (
    <View style={{ backgroundColor: "#454545", flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Resource</Text>

        <TextInput
          placeholder="Title"
          placeholderTextColor="#ccc"
          style={styles.input}
          onChangeText={(value) => setResource({ ...resource, title: value })}
        />
        {/* <TextInput
          placeholder="URL"
          style={styles.input}
          onChangeText={(value) => setResource({ ...resource, url: value })}
        /> */}
        <SelectList
          placeholder="Course"
          boxStyles={styles.selectList}
          inputStyles={{ color: "#ccc" }}
          dropdownTextStyles={{ color: "#ccc" }}
          setSelected={(value) => setResource({ ...resource, course: value })}
          data={courses?.map((course) => ({
            label: course.name,
            value: course.name,
          }))}
          save="value"
        />

        <SelectList
          placeholder="Community"
          boxStyles={styles.selectList}
          inputStyles={{ color: "#ccc" }}
          dropdownTextStyles={{ color: "#ccc" }}
          setSelected={(value) =>
            setResource({ ...resource, community: value })
          }
          data={communities?.map((community) => ({
            label: community.name,
            value: community.name,
          }))}
          save="value"
        />

        <SelectList
          placeholder="Type"
          boxStyles={styles.selectList}
          inputStyles={{ color: "#ccc" }}
          dropdownTextStyles={{ color: "#ccc" }}
          setSelected={(value) => setResource({ ...resource, type: value })}
          data={resourceTypes?.map((resourceType) => ({
            label: resourceType.name,
            value: resourceType.name,
          }))}
          save="value"
        />
        <TouchableOpacity
          title="Pick Document"
          style={styles.addDocumentButton}
          onPress={pickDocument}
        >
          <Text style={styles.buttonText}>Pick Document</Text>
        </TouchableOpacity>

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
    color: "white",
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
    marginBottom: 10,
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
  addDocumentButton: {
    backgroundColor: "#689bf7",
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
    width: 350,
    marginBottom: 10,
    marginTop: 10,
  },
});
