import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../src/api";

const ProfessorCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => navigation.navigate("ProfessorDetail", { id: item._id })}
    >
      <Image
        source={{
          uri: `${BASE_URL}/${item?.profileImage.replace("\\", "//")}`,
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.department}>
          {item?.department || "Department"}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#2E2E3E",
    borderRadius: 15,
    margin: 8,
    width: "47%",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  textContainer: {
    padding: 12,
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  department: {
    color: "#e8b800",
    fontSize: 14,
  },
});

export default ProfessorCard;
