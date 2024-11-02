import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCourses } from "../../src/api/courses";
import { getNotifications } from "../../src/api/Notifications";
import Notification from "../../components/Notification";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(false);
  const queryClient = useQueryClient();

  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
  });

  const {
    data: notifications,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getNotifications"],
    queryFn: getNotifications,
    onSuccess: (data) => {
      if (data && data.length > 0) {
        const latestNotification = data[data.length - 1];
        setNotificationMessage(latestNotification.message);
        setNotificationVisible(true);
        setTimeout(() => setNotificationVisible(false), 3000); // Hide after 3 seconds
      }
    },
  });

  const handleRefreshNotifications = () => {
    queryClient.invalidateQueries("getNotifications");
  };

  return (
    <View style={styles.container}>
      <Notification
        message={notificationMessage}
        visible={notificationVisible}
      />
      <TouchableOpacity
        onPress={handleRefreshNotifications}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Refresh Notifications</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131313",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
