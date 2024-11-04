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
          <Text style={styles.heading}>Add Your Rating:</Text>
          <StarRating rating={rating} setRating={setRating} />
          {ratingError ? <Text style={styles.error}>{ratingError}</Text> : null}
          <Button title="Submit Rating" onPress={handleRatingSubmit} />
          {/* Comments Section */}
          <View style={styles.commentsContainer}>
            <Text style={styles.heading}>Comments</Text>
            <TextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Add a comment..."
              style={styles.textInput}
              multiline
            />
            <Button
              title={
                createCommentMutation.isLoading ? "Posting..." : "Post Comment"
              }
              onPress={handleCommentSubmit}
              disabled={createCommentMutation.isLoading}
            />

            {commentsQuery.data?.map((item) => {
              return (
                <View style={styles.comment}>
                  <Image
                    source={{
                      uri: `${BASE_URL}/${item.user.profileImage?.replace(
                        "\\\\",
                        "//"
                      )}`,
                    }}
                    style={styles.commentUserImage}
                  />
                  <View style={styles.commentContent}>
                    <Text style={styles.commentUser}>{item.user.username}</Text>
                    <Text>{item.text}</Text>
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
                              uri: `${BASE_URL}/${reply.user.profileImage?.replace(
                                "\\\\",
                                "//"
                              )}`,
                            }}
                            style={styles.commentUserImage}
                          />
                          <View style={styles.commentContent}>
                            <Text style={styles.commentUser}>
                              {reply.user.username}
                            </Text>
                            <Text>{reply.text}</Text>
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
      return (
        <View style={styles.resourcesContainer}>
          <Text style={styles.heading}>Resources</Text>
          {course?.resources?.length > 0 ? (
            course.resources.map((resource) => (
              <Text key={resource.id} style={styles.resourceItem}>
                {resource.title}
              </Text>
            ))
          ) : (
            <Text>No resources available</Text>
          )}
        </View>
      );
    }
  };
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading course details</Text>;
  }

  return (
    <ScrollView style={styles.container} nestedScrollEnabled>
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
        Rating: {course?.avgRating || "No Rating"}
      </Text>
      <View style={styles.optionButtons}>
        <Button
          title="Rate"
          onPress={() => setSelectedOption("rate")}
          color={selectedOption === "rate" ? "blue" : "gray"}
        />
        <Button
          title="Resources"
          onPress={() => setSelectedOption("resources")}
          color={selectedOption === "resources" ? "blue" : "gray"}
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
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
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
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },

  comment: {
    flexDirection: "row",
    marginVertical: 8,
  },
  commentUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontWeight: "bold",
  },
  commentDate: {
    fontSize: 12,
    color: "#555",
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
