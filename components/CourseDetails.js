import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCourseById, addRating } from "../src/api/courses";
import {
  getComments,
  createComment2,
  deleteComment,
  replyToComment,
} from "../src/api/comment";
import { BASE_URL } from "../src/api";
import { colors } from "../Colors";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { bookmarkResource } from "../src/api/resource";
import { getBookmarkedResources } from "../src/api/resource";
import { likeResource, dislikeResource } from "../src/api/resource";
const Star = ({ filled, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.star}>{filled ? "★" : "☆"}</Text>
  </TouchableOpacity>
);

const StarRating = ({ rating, setRating }) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= rating}
          onPress={() => setRating(star)}
        />
      ))}
    </View>
  );
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

const CourseDetails = ({ route }) => {
  const { id } = route.params;

  const queryClient = useQueryClient();
  const [bookmarkedResources, setBookmarkedResources] = useState({});
  const [likedResources, setLikedResources] = useState({});
  const [dislikedResources, setDislikedResources] = useState({});
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showReplies, setShowReplies] = useState({});
  const [selectedOption, setSelectedOption] = useState("rate");
  const navigation = useNavigation();
  const commentsQuery = useQuery({
    queryKey: ["getComments", id],
    queryFn: () => getComments("course", id),
  });

  const createCommentMutation = useMutation({
    mutationFn: (commentData) => createComment2(id, commentData, "course"),
    onSuccess: () => {
      queryClient.invalidateQueries(["getComments", id]);
      setNewComment("");
    },
  });

  const handleBookmark = (resourceId) => {
    const isBookmarked = bookmarkedResources[resourceId] || false; // Check if the resource is bookmarked
    bookmarkResource(resourceId).then(() => {
      setBookmarkedResources((prev) => ({
        ...prev,
        [resourceId]: !isBookmarked,
      }));
    });
  };

  const replyCommentMutation = useMutation({
    mutationFn: (replyData) => replyToComment(replyingTo, replyData),
    onSuccess: () => {
      queryClient.invalidateQueries(["getComments", id]);
      setReplyContent("");
      setReplyingTo(null);
    },
  });

  const handleCommentSubmit = () => {
    createCommentMutation.mutate({ content: newComment });
  };

  const handleReplySubmit = () => {
    replyCommentMutation.mutate({ content: replyContent });
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId).then(() => {
      queryClient.invalidateQueries(["getComments", id]);
    });
  };

  const toggleReplies = (commentId) => {
    setShowReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getCourse", id],
    queryFn: () => getCourseById(id),
  });

  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState("");

  const mutation = useMutation({
    mutationFn: (newRating) => addRating(id, newRating),
    onSuccess: () => {
      queryClient.invalidateQueries(["getCourse", id]);
      setRating(0);
    },
    onError: (error) => {
      setRatingError(error.response?.data || error.message);
    },
  });

  const handleRatingSubmit = () => {
    if (rating < 1 || rating > 5) {
      setRatingError("Rating must be between 1 and 5");
      return;
    }
    mutation.mutate({ rating });
  };
  const renderSelectedOption = () => {
    if (selectedOption === "rate") {
      return (
        <View>
          <View style={styles.rateContainer}>
            <Text style={styles.heading}>Add Your Rating:</Text>
            <StarRating rating={rating} setRating={setRating} />
            {ratingError ? (
              <Text style={styles.error}>{ratingError}</Text>
            ) : null}
            <Button title="Submit Rating" onPress={handleRatingSubmit} />
          </View>
          {/* Comments Section */}
          <View style={styles.commentsContainer}>
            <Text style={styles.heading}>Comments</Text>
            <TextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Add a comment..."
              style={styles.textInput}
              placeholderTextColor={colors.white}
              multiline
            />
            <Button
              title={
                createCommentMutation.isLoading ? "Posting..." : "Post Comment"
              }
              color={colors.blue}
              onPress={handleCommentSubmit}
              disabled={createCommentMutation.isLoading}
            />

            {commentsQuery.data?.map((item) => {
              return (
                <View style={styles.comment}>
                  <Image
                    source={{
                      uri: item.user.profileImage
                        ? `${BASE_URL}/${item.user.profileImage.replace(
                            "\\",
                            "/"
                          )}`
                        : `${BASE_URL} 
                        default-profile-image.png`,
                    }}
                    style={styles.commentUserImage}
                  />
                  <View style={styles.commentContent}>
                    <Text style={styles.commentUser}>{item.user.username}</Text>
                    <Text style={styles.commentText}>{item.content}</Text>
                    <Text style={styles.commentDate}>
                      {formatTimeAgo(item.createdAt)}
                    </Text>
                    <View style={styles.commentActions}>
                      <TouchableOpacity onPress={() => setReplyingTo(item._id)}>
                        <Text style={styles.replyButton}>Reply</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteComment(item._id)}
                      >
                        <Text style={styles.deleteButton}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                    {replyingTo === item._id && (
                      <View style={styles.replyForm}>
                        <TextInput
                          value={replyContent}
                          onChangeText={setReplyContent}
                          placeholder="Write a reply..."
                          style={styles.textInput}
                          multiline
                        />
                        <Button
                          title={
                            replyCommentMutation.isLoading
                              ? "Replying..."
                              : "Post Reply"
                          }
                          onPress={handleReplySubmit}
                          disabled={replyCommentMutation.isLoading}
                        />
                      </View>
                    )}
                    {item.replies && item.replies.length > 0 && (
                      <TouchableOpacity onPress={() => toggleReplies(item._id)}>
                        <Text style={styles.showRepliesButton}>
                          {showReplies[item._id]
                            ? "Hide Replies"
                            : "Show Replies"}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {showReplies[item._id] &&
                      item.replies.map((reply) => (
                        <View key={reply._id} style={styles.reply}>
                          <Image
                            source={{
                              uri: item.user.profileImage
                                ? `${BASE_URL}/${item.user.profileImage.replace(
                                    "\\",
                                    "/"
                                  )}`
                                : `${BASE_URL}/default-profile-image.png`,
                            }}
                            style={styles.commentUserImage}
                          />
                          <View style={styles.commentContent}>
                            <Text style={styles.commentUser}>
                              {reply.user.username}
                            </Text>
                            <Text style={styles.commentText}>
                              {reply.content}
                            </Text>
                            <Text style={styles.commentDate}>
                              {formatTimeAgo(reply.createdAt)}
                            </Text>
                          </View>
                        </View>
                      ))}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      );
    } else if (selectedOption === "resources") {
      return course?.resources.map((resource) => (
        <TouchableOpacity
          key={resource._id}
          style={styles.resourceContainer}
          onPress={() =>
            navigation.navigate("ResourceDetailIndex", {
              id: resource._id,
            })
          }
        >
          <Text style={styles.resourceTitle}>{resource.title}</Text>
          <Text style={styles.resourceUrl}>{resource.url}</Text>

          <View style={styles.resourceActions}>
            <View style={styles.voteContainer}>
              <TouchableOpacity
                onPress={() => likeResourceMutation.mutate(resource._id)}
                style={styles.voteButton}
              >
                <Feather name="arrow-up" size={20} color="#28a745" />
                <Text style={styles.voteCount}>{resource.likes?.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dislikeResourceMutation.mutate(resource._id)}
                style={styles.voteButton}
              >
                <Feather name="arrow-down" size={20} color="#dc3545" />
                <Text style={styles.voteCount}>
                  {resource.dislikes?.length}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => handleBookmark(resource._id)}
              style={styles.bookmarkButton}
            >
              {bookmarkedResources[resource._id] ? (
                <FontAwesome
                  name="bookmark"
                  size={20}
                  color={colors.brightBlue} // Filled color for bookmarked
                />
              ) : (
                <Feather
                  name="bookmark"
                  size={20}
                  color={colors.brightBlue} // Unfilled color for not bookmarked
                />
              )}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ));
    }
  };
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading course details</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{course?.name || "Course Name"}</Text>
        <Text style={styles.description}>{course?.major || "major"}</Text>
        <Text style={styles.description}>
          {course?.about || "Course Description"}
        </Text>
        <Text style={styles.heading}>
          Level: {course?.level || "Course Level"}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProfessorDetailIndex", {
              id: course?.professor?._id,
            })
          }
        >
          <Text style={styles.heading}>
            Professor: {course?.professor?.name || "Professor Name"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.heading}>
          Course Rating: {course?.avgRating || "No Rating"}
        </Text>
      </View>
      <View style={styles.optionButtons}>
        <Button
          title="Rate"
          onPress={() => setSelectedOption("rate")}
          color={selectedOption === "rate" ? colors.brightBlue : colors.gray}
        />
        <Button
          title="Resources"
          onPress={() => setSelectedOption("resources")}
          color={
            selectedOption === "resources" ? colors.brightBlue : colors.gray
          }
        />
      </View>
      {renderSelectedOption()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.bg,
  },
  header: {
    flex: 1,
    backgroundColor: colors.brightBlue,
    padding: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
    color: colors.white,
  },
  bookmarkButton: {
    color: colors.brightBlue,
  },
  activeTabButton: {
    borderBottomColor: colors.brightBlue, // Highlight color
  },

  voteContainer: {
    flexDirection: "row",
  },
  rateContainer: {
    backgroundColor: "#2c2c2c",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  resourceActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: colors.brightBlue,
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
    color: colors.white,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    color: colors.white,
  },
  starContainer: {
    flexDirection: "row",
  },
  star: {
    fontSize: 32,
    color: "#FFD700",
  },
  error: {
    color: "red",
  },
  commentsContainer: {
    marginTop: 16,
    backgroundColor: "#2c2c2c",
    padding: 10,
    borderRadius: 10,
  },
  resourceContainer: {
    backgroundColor: "#2c2c2c", // Dark resource background
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  commentText: {
    color: colors.white,
    marginBottom: 5,
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    color: colors.white,
  },

  comment: {
    flexDirection: "row",
    marginVertical: 8,
    backgroundColor: "#2c2c2c",
    padding: 10,
    borderRadius: 10,
  },
  commentUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  commentContent: {
    flex: 1,
    borderWidth: 1,

    borderColor: colors.white,
    borderRadius: 10,
    padding: 10,
  },
  resourceUrl: {
    color: "#03dac6", // Highlight color
    marginBottom: 10,
  },
  resourceTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.brightBlue, // Highlight color
  },
  commentUser: {
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 5,
  },
  commentDate: {
    fontSize: 12,
    color: colors.white,
    marginBottom: 5,
    marginTop: 5,
  },
  button: {
    marginTop: 5,
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    padding: 10,
    fontWeight: "bold",
  },
  commentActions: {
    flexDirection: "row",
    marginTop: 4,
  },
  replyButton: {
    marginRight: 16,
    color: "#007BFF",
  },
  deleteButton: {
    color: "#FF0000",
  },
  replyForm: {
    marginTop: 8,
  },
  showRepliesButton: {
    color: "#007BFF",

    marginTop: 4,
  },
  reply: {
    flexDirection: "row",

    marginVertical: 8,
    marginLeft: 40,
  },
  optionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default CourseDetails;
