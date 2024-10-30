import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import { BASE_URL } from "../src/api";

const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const commentDate = new Date(timestamp);
  const seconds = Math.floor((now - commentDate) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
};

const ChatCard = ({ item, authenticatedUserId }) => {
  const navigation = useNavigation();
  const lastComment = item.lastComment; // Access lastComment from the backend

  const handlePress = () => {
    navigation.navigate("ChatDetails", { id: item._id });
  };

  const formattedTime = lastComment ? formatTimeAgo(lastComment.createdAt) : "";

  // Filter out the authenticated user from participants
  const otherParticipants = item.participants.filter(
    (participant) => participant._id !== authenticatedUserId
  );

  return (
    <TouchableOpacity style={styles.chatContainer} onPress={handlePress}>
      <View style={styles.profileImageContainer}>
        {otherParticipants.length === 1 ? (
          <Image
            source={{
              uri: `${BASE_URL}/${otherParticipants[0]?.profileImage?.replace(
                "\\",
                "//"
              )}`,
            }}
            style={styles.profileImage}
          />
        ) : (
          otherParticipants.slice(0, 2).map((participant, index) => (
            <Image
              key={index}
              source={{
                uri: `${BASE_URL}/${participant.profileImage?.replace(
                  "\\",
                  "//"
                )}`,
              }}
              style={[
                styles.profileImage,
                index === 1 && styles.profileImageOverlap,
              ]}
            />
          ))
        )}
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.chatName}>{item.chatName}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {lastComment ? lastComment.content : "No Messages Yet"}
        </Text>
        <Text style={styles.timestamp}>{lastComment ? formattedTime : ""}</Text>
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
    borderBottomColor: "#454545",
    backgroundColor: "#252423",
    marginBottom: -10, // Add this line to create overlap
  },
  profileImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileImageOverlap: {
    marginLeft: -35,
  },
  messageContainer: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  lastMessage: {
    fontSize: 14,
    color: "#689bf7",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
});

export default ChatCard;
