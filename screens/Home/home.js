import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe } from "../../src/api/user";
import { getAllCourses } from "../../src/api/courses";
import { deleteToken } from "../../src/api/storage";
import { BASE_URL } from "../../src/api";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../context/UserContext";
import { getCommunityById } from "../../src/api/Community";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();

  // Fetch user profile data
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMe,
    onSuccess: (data) => {
      if (data) {
        setUser(data);
        console.log("User data from backend:", data); // Log user data
      }
    },
  });

  const { mutate: community } = useMutation({
    mutationKey: ["getCommunityById"],
    mutationFn: getCommunityById,
  });

  // const { data: courses } = useQuery({
  //   queryKey: ["courses"],
  //   queryFn: getAllCourses,
  // });

  const handleLogout = () => {
    deleteToken();
    setUser(false);
    navigation.navigate("NoAuthHome");
  };

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (isError)
    return <Text style={styles.errorText}>Error loading user data</Text>;

  return (
    <View style={styles.container}>
      {/* Overlay to close dropdown if clicked outside */}
      {showMenu && (
        <Pressable style={styles.overlay} onPress={() => setShowMenu(false)} />
      )}

      {/* Header section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome, {userData.username}!</Text>
          <TouchableOpacity
            style={styles.profilePictureContainer}
            onPress={() => setShowMenu(!showMenu)}
          >
            <Image
              source={{
                uri: `${BASE_URL}/${userData?.profileImage?.replace(
                  "\\",
                  "//"
                )}`,
              }}
              style={styles.profilePicture}
            />
          </TouchableOpacity>
        </View>

        {/* Dropdown Menu positioned under the profile picture */}
        {showMenu && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity onPress={handleProfile} style={styles.menuItem}>
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Communities Section with Horizontal Scroll */}
      <Text style={styles.sectionTitle}>Your Communities:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.communityContainer}
      >
        {userData?.communities?.map((community) => (
          <TouchableOpacity
            key={community._id}
            style={styles.communityBlock}
            onPress={() => {
              console.log(`first ${community._id}`),
                navigation.navigate("CommunityIndex", { id: community._id });
            }}
          >
            <Image
              source={{
                uri: `${BASE_URL}/${community?.profileImage?.replace(
                  "\\",
                  "//"
                )}`,
              }}
              style={styles.communityImage}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bookmarks Section */}
      <Text style={styles.sectionTitle}>Bookmarks:</Text>
      <View style={styles.bookmarkContainer}>
        {userData?.bookmarks?.map((resource, index) => (
          <TouchableOpacity
            key={index}
            style={styles.bookmarkText}
            onPress={() =>
              navigation.navigate("ResourceDetailIndex", {
                id: resource._id,
              })
            }
          >
            <Text style={styles.bookmarkText}>
              {resource.title || "Latest Saved Files"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Courses Section */}
      <Text style={styles.sectionTitle}>Rate Your Course:</Text>
      <ScrollView contentContainerStyle={styles.courseContainer}>
        {userData?.courses?.map((course, index) => (
          <View key={index} style={styles.courseBox}>
            <Text style={styles.courseText}>{course.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1a1a1a",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  header: {
    width: "100%",
    padding: 20,
    backgroundColor: "#4b3f72",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "flex-start", // Aligns content to the top
    paddingTop: 40, // Space for top padding to align better with top of the page
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  profilePictureContainer: {
    alignItems: "flex-end",
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  dropdownMenu: {
    position: "absolute",
    top: 100, // Position dropdown just below the profile picture
    right: 50,
    backgroundColor: "#333",
    borderRadius: 8,
    width: 120,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    padding: 10,
    alignItems: "center",
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginVertical: 10,
    color: "#fff",
  },
  communityContainer: {
    flexDirection: "row",
  },
  communityBlock: {
    width: 100,
    marginTop: 10,
    height: 100,
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  communityImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  communityText: {
    color: "#fff",
    fontSize: 14,
  },
  bookmarkContainer: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  bookmarkText: {
    fontSize: 16,
    color: "#fff",
  },
  courseContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  courseBox: {
    backgroundColor: "#4b3f72",
    width: "47%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  courseText: {
    fontSize: 16,
    color: "#fff",
  },
  loadingText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
    marginTop: 20,
  },
});
