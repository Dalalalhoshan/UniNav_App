import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../src/api/user";
import ChatCard from "./ChatCard";

const ChatList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
  });

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading chats...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error.message}</Text>;
  }

  // Map over the chats to include the last comment
  const userChats = data.Chats.map((chat) => {
    const lastComment = chat.comments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
    return {
      ...chat,
      lastComment: lastComment || null,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Chats</Text>
      <FlatList
        scrollEnabled={false}
        data={userChats}
        renderItem={({ item }) => (
          <ChatCard item={item} authenticatedUserId={data._id} />
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 8,
    padding: 5,
    backgroundColor: "#252423",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
  },
  loadingText: {
    color: "#689bf7",
    textAlign: "center",
  },
  errorText: {
    color: "#ff6888",
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  flatList: {
    flex: 1,
  },
});

export default ChatList;
