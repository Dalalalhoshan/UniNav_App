import React from "react";
import { getAllCommunities } from "../src/api/Community";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View, Image } from "react-native";
const CommunityCard = ({ item }) => {
  const navigation = useNavigation();
  const HandlePress = () => {
    navigation.navigate("CommunityDetails", { id: item._id });
  };
  return (
    <Pressable
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 90,
      }}
      onPress={() => {
        HandlePress();
      }}
    >
      <View style={{ flex: 1, borderWidth: 1, width: 200, height: 200 }}>
        <Image
          source={{
            uri: `http://192.168.0.66:10000/api/${item?.profileImage}`,
          }}
          style={{ width: 30, height: 60 }}
        />
        <Text style={{ color: "black" }}>{item?.name}</Text>
        <Text style={{ color: "black" }}>{item?.createdBy.username}</Text>
      </View>
    </Pressable>
  );
};

export default CommunityCard;
