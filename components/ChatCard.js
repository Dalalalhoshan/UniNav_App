import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import { BASE_URL } from "../src/api";

const ChatCard = ({ item }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ChatDetails", { id: item._id });
  };

  return (
    <TouchableOpacity style={styles.chatContainer} onPress={handlePress}>
      <Image
        source={{
          uri: `${BASE_URL}/${item.participants[0]?.profileImage?.replace(
            "\\",
            "//"
          )}`,
        }}
        style={styles.profileImage}
      />
      <View style={styles.messageContainer}>
        <Text style={styles.chatName}>{item.chatName}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  messageContainer: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  lastMessage: {
    fontSize: 14,
    color: "#777",
  },
});

export default ChatCard;
