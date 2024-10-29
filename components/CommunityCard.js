import React from "react";
import { getAllCommunities } from "../src/api/Community";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";
import { BASE_URL } from "../src/api";
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
        backgroundColor: "#e8b800",
        // padding: 10,
        borderRadius: 10,
        height: 200,
        width: "45%",
        margin: 5,
        // alignItems: "center",
        // justifyContent: "center",
      }}
      onPress={() => {
        HandlePress();
      }}
    >
      <Image
        source={{
          uri: `${BASE_URL}/${item?.profileImage?.replace("\\", "//")}`,
        }}
        style={{
          width: "100%",
          height: "100%",

          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <View
        style={{
          padding: 10,
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "rgba(232,184,0,0.4)",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Text style={{ fontSize: 15, color: "black" }}>{item?.name}</Text>
        <Text style={{ fontSize: 15, color: "black" }}>
          {item?.createdBy.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommunityCard;
