import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChatById } from "../src/api/chat"; // Ensure this import is correct
import { createChat } from "../src/api/comment";
import UserContext from "../context/UserContext";
import { BASE_URL } from "../src/api"; // Ensure BASE_URL is correctly imported
import { getMe } from "../src/api/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ChatDetails = ({ route }) => {
  const { id } = route.params;
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState("");

  const {
    data: chatData,
    error,
    status,
    refetch: refetchChat,
  } = useQuery({
    queryKey: ["getChatById", id],
    queryFn: () => getChatById(id),
  });

  const { data: myData } = useQuery({
    queryKey: ["getMyData"],
    queryFn: getMe,
  });

  const mutation = useMutation({
    mutationFn: createChat,
    onSuccess: () => {
      queryClient.invalidateQueries(["getChatById", id]);
      setNewComment("");
    },
  });

  const handleSendComment = () => {
    if (newComment.trim() === "") return;

    createChat(id, { content: newComment })
      .then(() => {
        refetchChat(); // Use refetchChat instead of refetchComments
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });
  };

  if (status === "loading") {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (status === "error") {
    return <Text style={styles.errorText}>Error: {error.message}</Text>;
  }

  const comments = chatData?.comments || [];

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <FlatList
          data={comments}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View
              style={[
                item.user._id === myData?._id
                  ? styles.myCommentContainer
                  : styles.otherCommentContainer,
              ]}
            >
              <View
                style={[
                  styles.commentBox,
                  item.user._id === myData?._id
                    ? styles.myComment
                    : styles.otherComment,
                ]}
              >
                <View style={styles.commentHeader}>
                  <Image
                    source={{
                      uri: `${BASE_URL}/${item.user.profileImage?.replace(
                        "\\",
                        "//"
                      )}`,
                    }}
                    style={styles.commentUserImage}
                  />
                  <Text style={styles.commentUsername}>
                    {item.user.username}
                  </Text>
                </View>
                <Text style={styles.commentText}>{item.content}</Text>
              </View>
            </View>
          )}
        />
      </KeyboardAwareScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Send a message..."
          placeholderTextColor="#666" // Gray placeholder text
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSendComment}
        >
          <Text style={styles.submitButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8", // Light background
    padding: 10,
  },
  myCommentContainer: {
    alignItems: "flex-end",
    marginVertical: 5,
  },
  otherCommentContainer: {
    alignItems: "flex-start",
    marginVertical: 5,
  },
  commentBox: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
    backgroundColor: "#FFF", // White background for comments
  },
  myComment: {
    backgroundColor: "#D1FAD7", // Light green for my comments
  },
  otherComment: {
    backgroundColor: "#ECECEC", // Light gray for others' comments
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  commentUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentUsername: {
    fontWeight: "bold",
    marginRight: 10,
    color: "#333", // Dark text for username
  },
  commentText: {
    color: "#333", // Dark text for comment
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginRight: 10,
    color: "#333", // Dark text for input
  },
  submitButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 20,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  loadingText: {
    color: "#333", // Dark text for loading
  },
  errorText: {
    color: "#FF0000", // Red text for error
  },
});

export default ChatDetails;
