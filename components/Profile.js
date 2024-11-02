import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, updateUser } from "../src/api/user";
import { BASE_URL } from "../src/api/index";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
const Profile = () => {
  const queryClient = useQueryClient();
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      console.log("Image picker result:", result);

      if (!result.canceled) {
        const formData = new FormData();
        formData.append("profileImage", {
          uri: result.assets[0].uri,
          type: "image/jpeg",
          name: "profile-image.jpg",
        });

        updateUserInfo(formData, {
          onSuccess: () => {
            queryClient.invalidateQueries(["getMyProfile"]);
          },
          onError: (error) => {
            console.error("Upload error:", error);
            alert("Failed to upload image. Please try again.");
          },
        });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Failed to pick image. Please try again.");
    }
  };

  const pickBackgroundImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      const formData = new FormData();
      formData.append("backgroundImage", {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "background-image.jpg",
      });

      updateUserInfo(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries(["getMyProfile"]);
        },
      });
    }
  };
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMe,
  });
  const { mutate: updateUserInfo } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: updateUser,
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
          user.courses?.map((course, index) => (
            <View key={index} style={styles.dataBox}>
              <Text style={styles.dataText}>{course?.name}</Text>
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
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#F4F4F9" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={pickBackgroundImage} activeOpacity={0.7}>
        <Image
          source={{
            uri: `${BASE_URL}/${user.backgroundImage?.replace("\\", "//")}`,
          }}
          style={styles.backgroundImage}
        />
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickImage} activeOpacity={0.7}>
          <Image
            source={{
              uri: `${BASE_URL}/${user.profileImage.replace("\\", "//")}`,
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
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

      <ScrollView style={styles.infoBox}>{renderSelectedOption()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
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
    borderColor: "#4CAF50",
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
    backgroundColor: "#4b3f72",
    borderRadius: 15,
    alignItems: "center",
    width: 90,
  },
  menuText: {
    fontSize: 11,
    color: "#F4F4F9",
  },
  selectedItem: {
    backgroundColor: "#6b5b99",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  infoBox: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#4b3f72",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  dataBox: {
    backgroundColor: "#6b5b99",
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
  backButton: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999, // Increased from 1 to 999 to ensure it's above everything
    padding: 8,
    margin: 20,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  backButtonContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999,
    flex: 1,
  },
});

export default Profile;
