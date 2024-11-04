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
import { colors } from "../Colors";
import { Ionicons } from "@expo/vector-icons";
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
          scrollEnabled={false}
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
              {item.user._id !== myData?._id && (
                <Image
                  source={{
                    uri: `${BASE_URL}/${item.user.profileImage?.replace(
                      "\\",
                      "//"
                    )}`,
                  }}
                  style={styles.commentUserImage}
                />
              )}
              <View
                style={[
                  styles.commentBox,
                  item.user._id === myData?._id
                    ? styles.myComment
                    : styles.otherComment,
                ]}
              >
                {item.user._id !== myData?._id && (
                  <Text style={styles.commentUsername}>
                    {item.user.username}
                  </Text>
                )}
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
          <Ionicons name="send" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background
    padding: 10,
  },
  myCommentContainer: {
    alignItems: "flex-end",
    marginVertical: 5,
    flexDirection: "row-reverse",
  },
  otherCommentContainer: {
    alignItems: "flex-start",
    marginVertical: 5,
    flexDirection: "row",
  },
  commentBox: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
    backgroundColor: "#1E1E1E", // Darker comment background
  },
  myComment: {
    backgroundColor: colors.brightBlue, // Yellow for my comments
  },
  otherComment: {
    backgroundColor: "#2C2C2C", // Dark gray for others' comments
  },
  commentUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  commentUsername: {
    fontSize: 12, // Smaller font size for username
    color: "#FFFFFF", // Light text for username
    marginBottom: 5,
  },
  commentText: {
    color: "#E0E0E0", // Light gray text for comment
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#333333", // Dark border
    backgroundColor: "#1E1E1E", // Dark input background
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#444444", // Darker border
    borderRadius: 20,
    marginRight: 10,
    color: "#FFFFFF", // Light text for input
    backgroundColor: "#2C2C2C", // Dark input background
  },
  submitButton: {
    backgroundColor: colors.brightBlue, // Highlight color
    padding: 10,
    borderRadius: 50,
  },
  submitButtonText: {
    color: "#FFFFFF", // Light text for button
    fontWeight: "bold",
  },
  loadingText: {
    color: "#FFFFFF", // Light text for loading
  },
  errorText: {
    color: "#FF0000", // Red text for error
  },
});

export default ChatDetails;
