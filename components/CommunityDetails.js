import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCommunityById,
  requestToJoinCommunity,
  leaveCommunity,
} from "../src/api/Community";
import {
  getResources,
  toggleDislikeResource,
  toggleLikeResource,
} from "../src/api/resource";
import { getComments, createComment } from "../src/api/comment";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../context/UserContext";
import { getMe } from "../src/api/user"; // Import getMe function
import AnimatedButton from "./AnimatedButton";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons
import { BASE_URL } from "../src/api";

const CommunityDetails = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const [currentView, setCurrentView] = useState("comments");

  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [isLoadingJoinLeave, setIsLoadingJoinLeave] = useState(false);
  const [userId, setUserId] = useState(null); // State to hold user ID
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  // Fetch user ID using getMe
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userData = await getMe(); // Fetch user data
        console.log("Fetched user data:", userData); // Log the user data
        if (userData && userData._id) {
          setUserId(userData._id); // Set user ID only if it exists
        } else {
          console.error("User ID is undefined");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserId(); // Call the function to fetch user ID
  }, []);

  const { data: communityData, refetch: refetchCommunity } = useQuery({
    queryKey: ["getCommunityById", id],
    queryFn: () => getCommunityById(id),
    onSuccess: (data) => {
      const isUserFollower = data.followers.some(
        (follower) => follower._id === userId
      );
      setIsJoined(isUserFollower); // Ensure this is set correctly
      const hasUserRequested = data.joinRequests.some(
        (request) => request === userId
      );
      setHasRequested(hasUserRequested);
      setFollowerCount(data.followers.length);
    },
  });

  const { data: commentsData, refetch: refetchComments } = useQuery({
    queryKey: ["getComments", "community", id],
    queryFn: () => getComments("community", id),
  });

  const { data: resourcesData, refetch: refetchResources } = useQuery({
    queryKey: ["getResources", id],
    queryFn: () => getResources(id),
  });

  const joinCommunityMutation = useMutation({
    mutationFn: () => requestToJoinCommunity(id),
    onSuccess: (data) => {
      console.log(data);
      if (data.message == "Joined community successfully") {
        setIsJoined(true);
        setFollowerCount((prevCount) => prevCount + 1);
      } else if (data.message === "Join request sent") {
        setHasRequested(true);
      }
      queryClient.invalidateQueries(["getCommunityById", id]);
      setIsLoadingJoinLeave(false);
    },
    onError: () => {
      setIsLoadingJoinLeave(false);
    },
  });

  const leaveCommunityMutation = useMutation({
    mutationFn: () => leaveCommunity(id),
    onSuccess: () => {
      setIsJoined(false);
      setFollowerCount((prevCount) => prevCount - 1);
      queryClient.invalidateQueries(["getCommunityById", id]);
      setIsLoadingJoinLeave(false);
    },
    onError: () => {
      setIsLoadingJoinLeave(false);
    },
  });

  const likeResourceMutation = useMutation({
    mutationFn: (resourceId) => toggleLikeResource(resourceId),
    onSuccess: () => {
      queryClient.invalidateQueries(["getResources", id]);
    },
  });

  const dislikeResourceMutation = useMutation({
    mutationFn: (resourceId) => toggleDislikeResource(resourceId),
    onSuccess: () => {
      queryClient.invalidateQueries(["getResources", id]);
    },
  });

  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return;

    createComment(id, { content: newComment })
      .then(() => {
        refetchComments();
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });
  };

  const openPostDetail = (comment) => {
    navigation.navigate("PostDetail", { comment });
  };

  const handleJoinLeave = () => {
    setIsLoadingJoinLeave(true);
    if (isJoined) {
      leaveCommunityMutation.mutate();
    } else {
      joinCommunityMutation.mutate();
    }
  };

  useEffect(() => {
    if (communityData) {
      const isUserFollower = communityData.followers.some(
        (follower) => follower._id === userId
      );
      const hasUserRequested = communityData.joinRequests.some(
        (request) => request === userId
      );
      setIsJoined(isUserFollower);
      setHasRequested(hasUserRequested);
      setFollowerCount(communityData.followers.length);
    }
  }, [communityData, userId]); // Add userId as a dependency

  const openFollowersModal = () => {
    setModalVisible(true);
  };

  const closeFollowersModal = () => {
    setModalVisible(false);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const seconds = Math.floor((now - commentDate) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  if (!communityData) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: `${BASE_URL}/${communityData.profileImage.replace(
              "\\",
              "//"
            )}`,
          }}
          style={styles.image}
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>{communityData?.name}</Text>
          <TouchableOpacity onPress={openFollowersModal}>
            <Text style={styles.followersCount}>
              {followerCount} {followerCount === 1 ? "Follower" : "Followers"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.followersCount}>
            createdBy:
            {communityData?.createdBy.username}
          </Text>
        </View>
        <AnimatedButton isJoined={isJoined} handleJoinLeave={handleJoinLeave} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            currentView === "comments" && styles.activeTabButton,
          ]}
          onPress={() => setCurrentView("comments")}
        >
          <Text style={styles.tabButtonText}>Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            currentView === "resources" && styles.activeTabButton,
          ]}
          onPress={() => setCurrentView("resources")}
        >
          <Text style={styles.tabButtonText}>Resources</Text>
        </TouchableOpacity>
      </View>
      {currentView === "comments" ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Ask a question..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleCommentSubmit}
          >
            <Text style={styles.submitButtonText}>Post</Text>
          </TouchableOpacity>
          {commentsData && commentsData.length > 0 ? (
            commentsData.map((comment) => (
              <TouchableOpacity
                key={comment._id}
                onPress={() => openPostDetail(comment)}
                style={styles.commentContainer}
              >
                <View style={styles.commentHeader}>
                  <Image
                    source={{
                      uri: `${BASE_URL}/${comment.user.profileImage?.replace(
                        "\\",
                        "//"
                      )}`,
                    }}
                    style={styles.commentUserImage}
                  />
                  <Text style={styles.commentUsername}>
                    {comment.user.username}
                  </Text>
                  <Text style={styles.commentTimestamp}>
                    {formatTimeAgo(comment.createdAt)}{" "}
                    {/* Use the utility function */}
                  </Text>
                </View>
                <Text style={styles.comment}>{comment.content}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No questions available for this community.</Text>
          )}
        </>
      ) : (
        <>
          {communityData.resources && communityData.resources.length > 0 ? (
            communityData.resources.map((resource) => (
              <View key={resource._id} style={styles.resourceContainer}>
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <Text style={styles.resourceUrl}>{resource.url}</Text>
                <View style={styles.resourceActions}>
                  <View style={styles.voteContainer}>
                    <TouchableOpacity
                      onPress={() => likeResourceMutation.mutate(resource._id)}
                      style={styles.voteButton}
                    >
                      <Icon name="arrow-up" size={20} color="#28a745" />
                      <Text style={styles.voteCount}>
                        {resource.likes.length}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        dislikeResourceMutation.mutate(resource._id)
                      }
                      style={styles.voteButton}
                    >
                      <Icon name="arrow-down" size={20} color="#dc3545" />
                      <Text style={styles.voteCount}>
                        {resource.dislikes.length}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text>No resources available for this community.</Text>
          )}
        </>
      )}

      {/* Modal for Followers */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeFollowersModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Followers</Text>
            <FlatList
              data={communityData.followers}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Text style={styles.followerItem}>{item.username}</Text>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeFollowersModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CommunityDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#1e1e1e", // Dark background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff", // Light text color
  },
  followersCount: {
    fontSize: 16,
    color: "#bbbbbb", // Light grey text
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#333333", // Dark border
  },
  activeTabButton: {
    borderBottomColor: "#03dac6", // Highlight color
  },
  tabButtonText: {
    fontSize: 16,
    color: "#ffffff", // Light text color
  },
  input: {
    height: 40,
    borderColor: "#333333", // Dark border
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#2c2c2c", // Dark input background
    color: "#ffffff", // Light text color
  },
  submitButton: {
    backgroundColor: "#03dac6", // Highlight color
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#ffffff", // Light text color
    fontWeight: "bold",
  },
  commentContainer: {
    backgroundColor: "#2c2c2c", // Dark comment background
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  commentUsername: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#bb86fc", // Highlight color
  },
  comment: {
    color: "#ffffff", // Light text color
  },
  resourceContainer: {
    backgroundColor: "#2c2c2c", // Dark resource background
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  resourceTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#bb86fc", // Highlight color
  },
  resourceUrl: {
    color: "#03dac6", // Highlight color
    marginBottom: 10,
  },
  resourceActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  voteContainer: {
    flexDirection: "row", // Change to row for horizontal alignment
    alignItems: "center",
  },
  voteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  voteCount: {
    color: "#ffffff", // Light text color
    marginHorizontal: 5,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#bbbbbb", // Light grey text
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  followerItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#6200ea",
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  commentUserImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentTimestamp: {
    color: "#bbbbbb", // Light grey text for timestamp
    marginLeft: "auto", // Align timestamp to the right
  },
});
