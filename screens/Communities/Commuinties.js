import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CommunityList from "../../components/CommunityList";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ResourceList from "../../components/ResourceList";
const Commuinties = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CommunityList />
      {/* <ResourceList /> */}
      <TouchableOpacity
        style={styles.createCommunityButton}
        onPress={() => navigation.navigate("CreateCommunity")}
      >
        <Ionicons name="add" size={30} color="#F4F4F9" />
      </TouchableOpacity>
    </View>
  );
};
export default Commuinties;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createCommunityButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#e8b800",
    padding: 20,
    borderRadius: 50,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
