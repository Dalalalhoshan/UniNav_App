import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getResourceById } from "../src/api/resource";
import { BASE_URL } from "../src/api";
import Ionicons from "@expo/vector-icons/Ionicons";
const ResourceDetail = () => {
  const { id } = useRoute().params;
  const { data } = useQuery({
    queryKey: ["getResourceById", id],
    queryFn: () => getResourceById(id),
  });

  const handleOpenUrl = async () => {
    await Linking.openURL(BASE_URL + data?.url);
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#F4F4F9" />
        </TouchableOpacity>
      </View>

      <View style={styles.documentCard}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{data?.title}</Text>
          <TouchableOpacity style={styles.url} onPress={handleOpenUrl}>
            <Ionicons name="link" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.metadataContainer}>
          <Text style={styles.metadataLabel}>Type:</Text>
          <Text style={styles.metadataValue}>{data?.resourceType?.name}</Text>

          <Text style={styles.metadataLabel}>Community:</Text>
          <Text style={styles.metadataValue}>{data?.community?.name}</Text>

          <Text style={styles.metadataLabel}>Course:</Text>
          <Text style={styles.metadataValue}>{data?.course?.name}</Text>

          <Text style={styles.metadataLabel}>Major:</Text>
          <Text style={styles.metadataValue}>{data?.major?.name}</Text>
        </View>
      </View>
    </View>
  );
};

export default ResourceDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1a1a1a",
  },
  documentCard: {
    backgroundColor: "#0C70FF",
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 16,
    marginBottom: 8,
  },
  url: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 2,
  },
  metadataContainer: {
    gap: 8,
  },
  metadataLabel: {
    fontSize: 14,
    color: "#ccc",
    fontWeight: "600",
  },
  metadataValue: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonContainer: {
    marginBottom: 16,
  },
});
