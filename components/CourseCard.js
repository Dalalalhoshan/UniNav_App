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

const CourseCard = ({ item }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("CourseDetails", { id: item._id });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.cardContent}>
        <Image
          source={{
            uri: `http://192.168.0.66:10000/api/${item?.image}`,
          }}
          style={styles.image}
        />
        <Text style={styles.name}>{item?.name}</Text>
      </View>
    </Pressable>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    margin: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
