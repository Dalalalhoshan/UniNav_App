import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../src/api/user";
import { BASE_URL } from "../src/api/index";

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMe,
  });

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (isError) {
    return <Text style={styles.errorText}>Error fetching user data</Text>;
  }

  const renderSelectedOption = () => {
    switch (selectedOption) {
      case "Courses":
        return Array.isArray(user.courses) && user.courses.length > 0 ? (
          user.courses.map((course, index) => (
            <View key={index} style={styles.dataBox}>
              <Text style={styles.dataText}>{course}</Text>
            </View>
          ))
        ) : (
          <View style={styles.dataBox}>
            <Text style={styles.dataText}>No courses available</Text>
          </View>
        );
      case "Awards":
        return Array.isArray(user.awards) && user.awards.length > 0 ? (
          user.awards.map((award, index) => (
            <View key={index} style={styles.dataBox}>
              <Text style={styles.dataText}>{award}</Text>
            </View>
          ))
        ) : (
          <View style={styles.dataBox}>
            <Text style={styles.dataText}>No awards available</Text>
          </View>
        );
      case "Uploads":
        return Array.isArray(user.resources) && user.resources.length > 0 ? (
          user.resources.map((resource, index) => (
            <View key={index} style={styles.dataBox}>
              <Text style={styles.dataText}>{resource.title}</Text>
            </View>
          ))
        ) : (
          <View style={styles.dataBox}>
            <Text style={styles.dataText}>No uploads available</Text>
          </View>
        );
      case "Bookmarks":
        return Array.isArray(user.bookmarks) && user.bookmarks.length > 0 ? (
          user.bookmarks.map((bookmark, index) => (
            <View key={index} style={styles.dataBox}>
              <Text style={styles.dataText}>{bookmark.title}</Text>
            </View>
          ))
        ) : (
          <View style={styles.dataBox}>
            <Text style={styles.dataText}>No bookmarks available</Text>
          </View>
        );
      default:
        return (
          <View style={styles.dataBox}>
            <Text style={styles.dataText}>
              Select an option above to view details
            </Text>
          </View>
        );
    }
  };

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
        <Text style={styles.userName}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedOption === "Courses" ? styles.selectedItem : null,
          ]}
          onPress={() => setSelectedOption("Courses")}
        >
          <Text style={styles.menuText}>Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedOption === "Awards" ? styles.selectedItem : null,
          ]}
          onPress={() => setSelectedOption("Awards")}
        >
          <Text style={styles.menuText}>Awards</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedOption === "Uploads" ? styles.selectedItem : null,
          ]}
          onPress={() => setSelectedOption("Uploads")}
        >
          <Text style={styles.menuText}>Uploads</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedOption === "Bookmarks" ? styles.selectedItem : null,
          ]}
          onPress={() => setSelectedOption("Bookmarks")}
        >
          <Text style={styles.menuText}>Bookmarks</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>{renderSelectedOption()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2139",
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
    borderWidth: 4,
    borderColor: "#2D2D44",
  },
  userName: {
    fontSize: 22,
    color: "#F4F4F9",
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: "#A8A9B4",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  menuItem: {
    padding: 15,
    backgroundColor: "#2F334A",
    borderRadius: 15,
    alignItems: "center",
    width: 90,
  },
  menuText: {
    fontSize: 11,
    color: "#F4F4F9",
  },
  selectedItem: {
    backgroundColor: "#5A5E85",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  infoBox: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#2B2D4A",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  dataBox: {
    backgroundColor: "#3B3D5E",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  dataText: {
    color: "#F4F4F9",
    fontSize: 16,
  },
  loadingText: {
    color: "#F4F4F9",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: "#FF6B6B",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Profile;
