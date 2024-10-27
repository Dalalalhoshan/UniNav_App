import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe } from "../src/api/user";
import ChatCard from "./ChatCard";

const ChatList = () => {
  const queryClient = useQueryClient();
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Chats</Text>
      <FlatList
        data={data.Chats}
        renderItem={({ item }) => <ChatCard item={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2c3e50",
  },
  loadingText: {
    color: "#333",
    textAlign: "center",
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
  },
});

export default ChatList;
