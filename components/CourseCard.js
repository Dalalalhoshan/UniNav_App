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
import { colors } from "../Colors";

const CourseCard = ({ item }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("CourseDetails", { id: item._id });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item?.name}</Text>
      </View>
    </Pressable>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    backgroundColor: "#0C70FF",
    padding: 16,
    margin: 8,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",

    height: "100%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
