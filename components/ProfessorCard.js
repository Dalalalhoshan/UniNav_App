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

const ProfessorCard = ({ item }) => {
  const navigation = useNavigation();
  const HandlePress = () => {
    navigation.navigate("ProfessorDetail", { id: item._id });
  };
  return (
    <Pressable
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 90,
      }}
      onPress={HandlePress}
    >
      <View style={{ flex: 1, borderWidth: 1, width: 200, height: 200 }}>
        <Image
          source={{
            uri: `http://192.168.0.66:10000/api/${item?.profileImage}`,
          }}
          style={{ width: 30, height: 60 }}
        />
        <Text style={{ color: "black" }}>{item?.name}</Text>
      </View>
    </Pressable>
  );
};

export default ProfessorCard;

const styles = StyleSheet.create({});
