import React from "react";
import { getAllCommunities } from "../src/api/Community";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";
const randomColor = () => {
  const colors = ["#454545", "#ff88b8", "#e8b800", "#689bf7"];
  for (let i = 0; i < colors.length; i++) {
    const generatedRandomColor =
      colors[Math.floor(Math.random() * colors.length)];
    return generatedRandomColor;
  }
};
const CommunityCard = ({ item }) => {
  const navigation = useNavigation();
  const HandlePress = () => {
    navigation.navigate("CommunityDetails", { id: item._id });
  };
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: "#e8b800",
        padding: 90,
        borderRadius: 10,
        height: 100,
        width: 100,
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => {
        HandlePress();
      }}
    >
      <View style={{ flex: 1, borderWidth: 1, width: 200, height: 200 }}>
        <Image
          source={{
            uri: `http://192.168.2.129:10000/api/${item?.profileImage}`,
          }}
          style={{ width: 30, height: 60 }}
        />
        <Text style={{ fontSize: 15, color: "black" }}>{item?.name}</Text>
        <Text style={{ fontSize: 15, color: "black" }}>
          {item?.createdBy.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommunityCard;
