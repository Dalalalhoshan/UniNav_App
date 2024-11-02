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
import { getProfessorById, addProfessorRating } from "../src/api/proffesors";
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
const ProfessorDetail = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showReplies, setShowReplies] = useState({});

  const commentsQuery = useQuery({
    queryKey: ["getComments", id],
    queryFn: () => getComments("professor", id),
  });

  const createCommentMutation = useMutation({
    mutationFn: (commentData) => createComment2(id, commentData, "professor"),
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
    data: professor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getProfessor", id],
    queryFn: () => getProfessorById(id),
  });

  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState("");

  const mutation = useMutation({
    mutationFn: (newRating) => addProfessorRating(id, newRating),
    onSuccess: () => {
      queryClient.invalidateQueries(["getProfessor", id]);
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

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading professor details</Text>;
  }
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: `${BASE_URL}/${professor?.profileImage.replace("\\", "//")}`,
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{professor?.name}</Text>
      <Text style={styles.about}>{professor?.about}</Text>
      <Text style={styles.heading}>Courses:</Text>
      <FlatList
        data={professor?.courses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CourseDetails", { id: item._id })
            }
          >
            <Text style={styles.course}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.heading}>Rating: {professor?.avgRating}</Text>

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
        <FlatList
          data={commentsQuery.data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Image
                source={{
                  uri: `${BASE_URL}/${item.user.profileImage?.replace(
                    "\\",
                    "//"
                  )}`,
                }}
                style={styles.commentUserImage}
              />
              <View style={styles.commentContent}>
                <Text style={styles.commentUser}>{item.user.username}</Text>
                <Text>{item.content}</Text>
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
                      {showReplies[item._id] ? "Hide Replies" : "Show Replies"}
                    </Text>
                  </TouchableOpacity>
                )}
                {showReplies[item._id] &&
                  item.replies.map((reply) => (
                    <View key={reply._id} style={styles.reply}>
                      <Image
                        source={{
                          uri: `${BASE_URL}/${reply.user.profileImage?.replace(
                            "\\",
                            "//"
                          )}`,
                        }}
                        style={styles.commentUserImage}
                      />
                      <View style={styles.commentContent}>
                        <Text style={styles.commentUser}>
                          {reply.user.username}
                        </Text>
                        <Text>{reply.content}</Text>
                        <Text style={styles.commentDate}>
                          {formatTimeAgo(reply.createdAt)}
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default ProfessorDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8fa", // Light gray background similar to Twitter
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#e1e8ed", // Light gray border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 24, // Slightly smaller for a more compact look
    fontWeight: "bold", // Bold for emphasis
    textAlign: "center",
    color: "#14171a", // Dark gray for text
    marginBottom: 5,
  },
  about: {
    fontSize: 16, // Adjusted font size
    textAlign: "center",
    color: "#657786", // Medium gray for better readability
    marginBottom: 20,
  },
  heading: {
    fontSize: 20, // Adjusted font size
    fontWeight: "bold", // Bold for emphasis
    color: "#14171a",
    marginTop: 20,
    marginBottom: 10,
  },
  course: {
    fontSize: 16,
    color: "#1da1f2", // Twitter blue for links
    marginBottom: 10,
  },
  star: {
    fontSize: 32,
    color: "#FFD700", // Gold color for stars
    marginHorizontal: 5,
  },
  error: {
    color: "#e0245e", // Twitter red for errors
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "500",
  },
  commentsContainer: {
    marginTop: 20,
    backgroundColor: "#ffffff", // White background for comments section
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  textInput: {
    borderColor: "#e1e8ed",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
  comment: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  replyForm: {
    marginTop: 10,
    backgroundColor: "#f0f0f0", // Light background for reply form
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: "#1da1f2", // Twitter blue for buttons
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff", // White text for buttons
    fontWeight: "bold",
  },
  starContainer: {
    flexDirection: "row", // Changed to row for horizontal alignment
    justifyContent: "center", // Center the stars
    marginBottom: 10, // Added margin for spacing
  },
});
