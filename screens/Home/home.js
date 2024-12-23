import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe } from "../../src/api/user";
import { getAllCourses } from "../../src/api/courses";
import { deleteToken } from "../../src/api/storage";
import { BASE_URL } from "../../src/api";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../context/UserContext";
import { getCommunityById } from "../../src/api/Community";
import { colors } from "../../Colors";
import { Ionicons } from "@expo/vector-icons";
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
    // navigation.navigate("NoAuthHome");
  };

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (isError)
    return <Text style={styles.errorText}>Error loading user data</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* Overlay to close dropdown if clicked outside */}
      {showMenu && (
        <Pressable style={styles.overlay} onPress={() => setShowMenu(false)} />
      )}

      {/* Header section */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationList")}
          >
            <Ionicons name="notifications" size={24} color={colors.yellow} />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>Hi, {userData.username}!</Text>
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Text style={styles.sectionTitle}>Your Communities:</Text>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("CommunityListIndex")}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity> */}
      </View>
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
      <Text style={styles.sectionTitle}>Bookmarked Resources:</Text>
      <View style={styles.bookmarkContainer}>
        {userData?.bookmarks?.map((resource, index) => (
          <TouchableOpacity
            key={index}
            style={styles.bookMarkBox}
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
      <Text style={styles.sectionTitle}>Rate Your Courses:</Text>
      <ScrollView contentContainerStyle={styles.courseContainer}>
        {userData?.courses?.map((course, index) => (
          <TouchableOpacity
            key={index}
            style={styles.courseBox}
            onPress={() =>
              navigation.navigate("CourseDetails", { id: course._id })
            }
          >
            <Text style={styles.courseText}>{course.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#181617",
  },

  header: {
    position: "relative",
    width: "100%",
    padding: 20,
    backgroundColor: colors.cardBg,
    borderRadius: 30,
    justifyContent: "center", // Aligns content to the top
    zIndex: 100,
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
    borderColor: colors.black,
  },
  dropdownMenu: {
    position: "absolute",
    zIndex: 1000000,
    top: 100, // Position dropdown just below the profile picture
    right: 50,
    backgroundColor: colors.cardBg,
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
    color: colors.white,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: colors.white,
  },
  communityContainer: {
    flexDirection: "row",
  },
  communityBlock: {
    width: 100,
    marginTop: 10,
    height: 100,
    padding: 10,
    backgroundColor: colors.black,
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
    color: colors.white,
    fontSize: 14,
  },
  bookmarkContainer: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  bookMarkBox: {
    backgroundColor: colors.cardBg,
    padding: 10,
    borderRadius: 8,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  bookmarkText: {
    fontSize: 16,
    color: colors.white,
  },
  courseContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  courseBox: {
    backgroundColor: colors.brightBlue,
    width: "47%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  courseText: {
    fontSize: 16,
    color: colors.white,
  },
  loadingText: {
    color: colors.white,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: colors.red,
    textAlign: "center",
    marginTop: 20,
  },
  viewAll: {
    color: colors.yellow,
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
});
