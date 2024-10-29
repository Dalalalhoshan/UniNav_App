import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/user";
import { BASE_URL } from "../api";

const UserDetail = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getUserProfile"],
    queryFn: getMe,
  });

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (isError) {
    return <Text style={styles.errorText}>Error fetching user data</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `${BASE_URL}/${user.backgroundImage.replace("\\", "//")}`,
        }}
        style={styles.backgroundImage}
      />
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: `${BASE_URL}/${user.profileImage.replace("\\", "//")}`,
          }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user.username}</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Followers</Text>
          <Text style={styles.infoNumber}>{user.followers.length}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Following</Text>
          <Text style={styles.infoNumber}>{user.following.length}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Communities</Text>
          <Text style={styles.infoNumber}>{user.communities.length}</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Msg Icon</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Courses:</Text>
        <View style={styles.grid}>
          {user.courses.length > 0 ? (
            user.courses.map((course, index) => (
              <View key={index} style={styles.gridItem}>
                <Text style={styles.gridText}>Course {index + 1}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No courses available</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Awards:</Text>
        <View style={styles.grid}>
          {user.awards.length > 0 ? (
            user.awards.map((award, index) => (
              <View key={index} style={styles.gridItem}>
                <Text style={styles.gridText}>Award {index + 1}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No awards available</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  backgroundImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileSection: {
    alignItems: "center",
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  infoBox: {
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 16,
    color: "#666",
  },
  infoNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#2e86de",
    padding: 10,
    borderRadius: 8,
    width: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    backgroundColor: "#2e86de",
    width: "45%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  gridText: {
    color: "#fff",
    fontSize: 16,
  },
  noDataText: {
    color: "#999",
    fontSize: 16,
  },
  loadingText: {
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
    marginTop: 20,
  },
});

export default UserDetail;
