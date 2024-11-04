import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import { replyToComment } from "../src/api/comment";
import { BASE_URL } from "../src/api";
import { colors } from "../Colors";
import { Ionicons } from "@expo/vector-icons";
const PostDetail = ({ route, navigation }) => {
  const { comment } = route.params; // Get the comment passed from CommunityDetails
  const [replyContent, setReplyContent] = useState("");
  // Mutation for replying to a comment
  const replyToCommentMutation = useMutation({
    mutationFn: (replyData) => replyToComment(comment._id, replyData),
    onSuccess: (data) => {
      // Update the comment's replies in the local state
      comment.replies.push(data); // Add the new reply to the existing replies
      setReplyContent(""); // Clear the reply input
    },
  });

  const handleReplySubmit = () => {
    if (replyContent.trim() === "") return; // Prevent empty replies
    replyToCommentMutation.mutate({ content: replyContent });
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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.titleContainer}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={colors.white}
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.commentContainer}>
          <Image
            source={{
              uri: `${BASE_URL}/${comment.user.profileImage?.replace(
                "\\",
                "//"
              )}`,
            }}
            style={styles.commentUserImage}
          />
          <View style={styles.commentContent}>
            <Text style={styles.commentUsername}>{comment.user.username}</Text>
            <Text style={styles.commentTimestamp}>
              {formatTimeAgo(comment.createdAt)}
            </Text>
            <Text style={styles.comment}>{comment.content}</Text>
          </View>
        </View>
        <Text style={styles.repliesTitle}>Replies:</Text>
        <FlatList
          data={comment.replies}
          keyExtractor={(reply) => reply._id}
          renderItem={({ item }) => (
            <View style={styles.replyContainer}>
              <Image
                source={{
                  uri: `${BASE_URL}/${item.user.profileImage?.replace(
                    "\\",
                    "//"
                  )}`,
                }}
                style={styles.replyUserImage}
              />
              <View style={styles.replyContent}>
                <Text style={styles.replyUsername}>{item.user.username}</Text>
                <Text style={styles.replyTime}>
                  {formatTimeAgo(item.createdAt)}
                </Text>
                <Text style={styles.reply}>{item.content}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Reply..."
        placeholderTextColor="#888"
        value={replyContent}
        onChangeText={setReplyContent}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleReplySubmit}>
        <Text style={styles.submitButtonText}>Submit Reply</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#1e1e1e", // Dark background
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff", // Light text color
    marginBottom: 10,
  },
  repliesTitle: {
    fontSize: 18,
    color: "#bbbbbb", // Light grey text
    marginBottom: 10,
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
    backgroundColor: colors.brightBlue, // Highlight color
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButtonText: {
    color: "#ffffff", // Light text color
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#6200ea", // Vibrant button background
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: "#ffffff", // Light text color
    fontWeight: "bold",
  },
  reply: {
    color: "#ffffff", // Light text color
    marginVertical: 2,
    padding: 10,
    backgroundColor: "#2c2c2c", // Dark reply background
    borderRadius: 10,
  },
  replyContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  replyUserImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  replyContent: {
    flex: 1,
  },
  replyUsername: {
    fontWeight: "bold",
    color: "#ffffff", // Light text color
  },
  replyTime: {
    color: "#bbbbbb", // Light grey text
    fontSize: 12,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#2c2c2c", // Dark background for comment
    borderRadius: 10,
  },
  commentUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    fontWeight: "bold",
    color: "#ffffff", // Light text color
  },
  commentTimestamp: {
    color: "#bbbbbb", // Light grey text
    fontSize: 12,
  },
  comment: {
    color: "#ffffff", // Light text color
    marginVertical: 2,
    padding: 10,
    backgroundColor: "#2c2c2c", // Dark reply background
    borderRadius: 10,
  },
});
