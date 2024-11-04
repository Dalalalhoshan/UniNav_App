import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserById,
  addBookmark,
  removeBookmark,
  toggleFollowUser,
  getFollowers,
  getFollowing,
  getMe,
} from "../src/api/user";
import { BASE_URL } from "../src/api/index";
import FontAwesome from "@expo/vector-icons/FontAwesome"; // Import FontAwesome for filled bookmark
import Feather from "@expo/vector-icons/Feather"; // Import Feather for unfilled bookmark
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../Colors";

const AccountDetails = ({ route, navigation }) => {
  const { id } = route.params;
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showUserList, setShowUserList] = useState(false);
  const [userList, setUserList] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getUserById", id],
    queryFn: () => getUserById(id),
  });

  const { data: currentUser, isLoading: isLoadingCurrentUser } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
  });

  const followMutation = useMutation({
    mutationFn: toggleFollowUser,
    onMutate: () => {
      setIsFollowing((prev) => !prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["getUserById", id]);
    },
    onError: (error) => {
      console.error("Follow/Unfollow error:", error);
      setIsFollowing((prev) => !prev);
    },
  });

  useEffect(() => {
    if (user && currentUser) {
      console.log("User data fetched:", user);
      const currentUserId = currentUser._id; // Ensure this is the correct way to get the current user ID
      setIsFollowing(
        user.followers.some((follower) => follower._id === currentUserId)
      );
      getFollowers(id).then(setFollowers);
      getFollowing(id).then(setFollowing);
    }
  }, [user, currentUser]);

  const handleFollow = () => {
    followMutation.mutate(id);
  };

  const handleBookmark = (resourceId, isBookmarked) => {
    if (isBookmarked) {
      removeBookmark(resourceId).then(() => {
        const updatedBookmarks = user.bookmarks.filter(
          (bookmark) => bookmark.id !== resourceId
        );
        setUser((prevUser) => ({ ...prevUser, bookmarks: updatedBookmarks }));
      });
    } else {
      addBookmark(resourceId).then(() => {
        setUser((prevUser) => ({
          ...prevUser,
          bookmarks: [...prevUser.bookmarks, { id: resourceId }],
        }));
      });
    }
  };

  const handleFollowersPress = () => {
    setUserList(followers);
    setListTitle("Followers");
    setShowUserList(true);
  };

  const handleFollowingPress = () => {
    setUserList(following);
    setListTitle("Following");
    setShowUserList(true);
  };

  const handleUserPress = (id) => {
    setShowUserList(false);
    navigation.navigate("AccountDetails", { id });
  };

  const renderUserList = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{listTitle}</Text>
      {userList.map((user, index) => (
        <TouchableOpacity
          key={index}
          style={styles.userItem}
          onPress={() => handleUserPress(user._id)}
        >
          <Text style={styles.userName}>{user.username}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => setShowUserList(false)}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderSelectedOption = () => {
    switch (selectedOption) {
      case "Courses":
        return Array.isArray(user.courses) && user.courses.length > 0 ? (
          user.courses.map((course, index) => (
            <View key={index} style={styles.dataBox}>
              <Text style={styles.dataText}>{course.name}</Text>
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

  if (isLoading || isLoadingCurrentUser) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (isError) {
    return <Text style={styles.errorText}>Error fetching user data</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={colors.white}
          onPress={() => navigation.goBack()}
        />
      </View>
      {showUserList ? (
        renderUserList()
      ) : (
        <>
          <View style={styles.profileSection}>
            <Image
              source={{
                uri: `${BASE_URL}/${user.profileImage.replace("\\", "//")}`,
              }}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>{user?.username}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <TouchableOpacity
              onPress={handleFollow}
              style={styles.followButton}
            >
              <Text style={styles.followButtonText}>
                {isFollowing ? "Unfollow" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.followersFollowingContainer}>
              <TouchableOpacity
                style={styles.followersContainer}
                onPress={handleFollowersPress}
              >
                <Text style={styles.followersCount}>{followers.length}</Text>
                <Text style={styles.followersLabel}>Followers</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.followingContainer}
                onPress={handleFollowingPress}
              >
                <Text style={styles.followersCount}>{following.length}</Text>
                <Text style={styles.followersLabel}>Following</Text>
              </TouchableOpacity>
            </View>
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
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.bg, // Dark background
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderColor: colors.brightBlue, // Green border for profile image
    borderWidth: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white, // White text
  },
  email: {
    fontSize: 16,
    color: "#BBBBBB", // Light grey text
  },
  followButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: colors.brightBlue, // Green button
    borderRadius: 8,
  },
  followButtonText: {
    color: "#FFFFFF", // White text
    fontSize: 16,
  },
  profileCard: {
    padding: 16,
    backgroundColor: "#1E1E1E", // Darker card background
    borderRadius: 8,
    marginBottom: 16,
  },
  followersFollowingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  followersContainer: {
    alignItems: "center",
  },
  followingContainer: {
    alignItems: "center",
  },
  followersCount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF", // White text
  },
  followersLabel: {
    fontSize: 16,
    color: "#BBBBBB", // Light grey text
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  menuItem: {
    padding: 10,
  },
  selectedItem: {
    borderBottomWidth: 2,
    borderBottomColor: colors.brightBlue, // Green underline for selected item
  },
  menuText: {
    fontSize: 16,
    color: colors.white, // White text
  },
  infoBox: {
    padding: 16,
    backgroundColor: "#1E1E1E", // Darker info box background
    borderRadius: 8,
    color: colors.white,
  },
  userListContainer: {
    padding: 16,
    backgroundColor: "#1E1E1E", // Darker background for user list
    borderRadius: 8,
  },
  dataText: {
    color: colors.white,
  },
});

export default AccountDetails;
