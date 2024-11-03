import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../src/api/Notifications";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../Colors";

const NotificationList = () => {
  const navigation = useNavigation();

  const {
    data: notifications,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getNotifications"],
    queryFn: getNotifications,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error fetching notifications</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        style={{ backgroundColor: colors.bg }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingTop: 45,
    backgroundColor: colors.bg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.yellow,
  },
  headerTitle: {
    color: colors.yellow,
    fontSize: 20,
    marginLeft: 15,
  },
  list: {
    padding: 20,
    backgroundColor: colors.bg,
    gap: 10,
  },
  notificationItem: {
    padding: 15,
    backgroundColor: colors.purple,
    borderRadius: 10,
  },
  notificationMessage: {
    fontSize: 16,
    color: colors.white,
  },
  notificationDate: {
    fontSize: 12,
    color: colors.white,
  },
});

export default NotificationList;
