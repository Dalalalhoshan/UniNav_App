import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, getAllUsers, getAllChats } from "../../src/api/user"; // Ensure this import is correct
import ChatList from "../../components/ChatList";
import { BASE_URL } from "../../src/api";
import { createChat } from "../../src/api/chat";

const Chat = () => {
  const queryClient = useQueryClient(); // Initialize query client
  const { data: userData } = useQuery({
    queryKey: ["getMe"], // Use an array for the query key
    queryFn: getMe, // Function to fetch the data
  }); // Fetch current user data

  const { data: chats } = useQuery({
    queryKey: ["getAllChats"], // Query key for chats
    queryFn: getAllChats, // Function to fetch chats
  });

  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedParticipants, setSelectedParticipants] = useState([
    userData?._id,
  ]); // Automatically add current user
  const [chatName, setChatName] = useState(""); // State for chat name
  const [users, setUsers] = useState([]); // State for all users

  // Fetch all users when the modal opens
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        // Filter out the current user from the list
        const filteredUsers = allUsers.filter(
          (user) => user._id !== userData?._id
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (modalVisible) {
      fetchUsers();
    }
  }, [modalVisible, userData]);

  // Update selectedParticipants when userData changes
  useEffect(() => {
    if (userData) {
      setSelectedParticipants([userData._id]); // Automatically add current user
    }
  }, [userData]);

  // Function to handle participant selection
  const handleParticipantSelect = (userId) => {
    setSelectedParticipants((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId); // Remove if already selected
      } else {
        return [...prev, userId]; // Add if not selected
      }
    });
  };

  // Function to handle chat creation
  const createNewChat = async () => {
    if (selectedParticipants.length === 0) {
      console.error("No participants selected.");
      return; // Prevent chat creation if no participants
    }
    try {
      const chatData = {
        chatName,
        participants: selectedParticipants,
      };
      await createChat(chatData); // Call createChat API
      setModalVisible(false); // Close modal after creation
      setChatName(""); // Reset chat name
      setSelectedParticipants([userData?._id]); // Reset selected participants to include current user

      // Invalidate the chats query to refetch data
      queryClient.invalidateQueries(["getAllChats"]);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  if (userData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome {userData.username} 👋</Text>
          <View style={styles.friendsSection}>
            <Text style={styles.friendsTitle}>Chat With Your Friends</Text>
            <View style={styles.friendsContainer}>
              <TouchableOpacity
                style={styles.addFriendButton}
                onPress={() => setModalVisible(true)} // Open modal on press
              >
                <Text style={styles.addFriendText}>+</Text>
              </TouchableOpacity>
              <FlatList
                data={userData.following}
                renderItem={({ item }) => (
                  <Image
                    source={{
                      uri: `${BASE_URL}/${item.profileImage?.replace(
                        "\\",
                        "//"
                      )}`,
                    }}
                    style={styles.friendImage}
                  />
                )}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
        <ChatList />

        {/* Chat List */}
        <FlatList
          data={chats} // Use the fetched chats data
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.chatCard}>
              <Text>{item.chatName}</Text>
              {/* You can add more details about the chat here */}
            </View>
          )}
        />

        {/* Modal for creating chat */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                placeholder="Chat Name"
                value={chatName}
                onChangeText={setChatName}
                style={styles.input}
              />
              {/* Render list of users to select from */}
              <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleParticipantSelect(item._id)}
                    style={styles.userContainer}
                  >
                    <View style={styles.userInfo}>
                      <Image
                        source={{
                          uri: `${BASE_URL}/${item.profileImage?.replace(
                            "\\",
                            "//"
                          )}`,
                        }}
                        style={styles.commentUserImage}
                      />
                      <Text
                        style={{
                          color: selectedParticipants.includes(item._id)
                            ? "blue"
                            : "black",
                          fontWeight: selectedParticipants.includes(item._id)
                            ? "bold"
                            : "normal", // Bold if selected
                        }}
                      >
                        {item.username}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.userListContainer} // Added userListContainer style
                showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
              />
              <TouchableOpacity
                onPress={createNewChat}
                style={styles.createChatButton}
              >
                <Text style={{ color: "white" }}>Create Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return <Text style={styles.loadingText}>Loading...</Text>;
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0", // Light gray background for main container
  },
  header: {
    backgroundColor: "#1E1E1E", // Dark background for the header
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10, // Add margin to separate from the chat list
  },
  welcomeText: {
    color: "#FFF", // White text for welcome message
    fontSize: 16,
  },
  friendsSection: {
    backgroundColor: "#1E1E1E", // Dark background for friends section
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  friendsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF", // White text for title
    marginBottom: 10,
  },
  friendsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addFriendButton: {
    backgroundColor: "#FFF", // White background for the button
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  addFriendText: {
    color: "#000", // Black text
    fontSize: 24,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  loadingText: {
    color: "#333", // Dark text for loading
    textAlign: "center",
  },
  errorText: {
    color: "#FF0000", // Red text for error
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF", // White background for modal content
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    maxHeight: "80%", // Set a maximum height for the modal content
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: "100%",
    padding: 10,
    backgroundColor: "#FFF", // White background for input
  },
  createChatButton: {
    backgroundColor: "#1E1E1E", // Dark background for button
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  chatCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  commentUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userContainer: {
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center items vertically
    padding: 10, // Add padding for better touch area
    borderBottomWidth: 1, // Add a bottom border
    borderBottomColor: "#ccc", // Light gray border color
  },
  userInfo: {
    flexDirection: "row", // Align image and text in a row
    alignItems: "center", // Center items vertically
  },
  userListContainer: {
    paddingBottom: 20, // Add padding at the bottom for better spacing
    backgroundColor: "#FFF", // White background for the user list
    borderRadius: 10, // Rounded corners
  },
});
