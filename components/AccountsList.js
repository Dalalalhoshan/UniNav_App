import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../src/api/user";
import AccountCard from "./AccountsCard";

const AccountList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
  });

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading accounts...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Accounts</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <AccountCard account={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default AccountList;
