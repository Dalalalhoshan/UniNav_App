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
import { getMe, getAllUsers, getAllChats } from "../../src/api/user";
import ChatList from "../../components/ChatList";
import { BASE_URL } from "../../src/api";
import { createChat } from "../../src/api/chat";
import debounce from "lodash.debounce";
const Chat = () => {
  const queryClient = useQueryClient();
  const { data: userData } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
  });
  const { data: chats } = useQuery({
    queryKey: ["getAllChats"],
    queryFn: getAllChats,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState([
    userData?._id,
  ]);
  const [chatName, setChatName] = useState("");
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
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

  useEffect(() => {
    if (userData) {
      setSelectedParticipants([userData._id]);
    }
  }, [userData]);

  const handleParticipantSelect = (userId) => {
    setSelectedParticipants((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const createNewChat = async () => {
    if (selectedParticipants.length === 0) {
      console.error("No participants selected.");
      return;
    }
    try {
      const chatData = {
        chatName,
        participants: selectedParticipants,
      };
      await createChat(chatData);
      setModalVisible(false);
      setChatName("");
      setSelectedParticipants([userData?._id]);
      queryClient.invalidateQueries(["getAllChats"]);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                onPress={() => setModalVisible(true)}
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
        <FlatList
          data={chats}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.chatCard}>
              <Text style={styles.chatName}>{item.chatName}</Text>
            </View>
          )}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                placeholder="Enter Chat Name"
                value={chatName}
                onChangeText={setChatName}
                style={styles.input}
                placeholderTextColor="#FFFFFF"
              />
              <TextInput
                placeholder="Search Users"
                onChangeText={handleSearch}
                style={styles.input}
                placeholderTextColor="#FFFFFF"
              />
              <FlatList
                data={filteredUsers}
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
                            ? "#e8b800"
                            : "#FFFFFF",
                          fontWeight: selectedParticipants.includes(item._id)
                            ? "bold"
                            : "normal",
                        }}
                      >
                        {item.username}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.userListContainer}
                showsVerticalScrollIndicator={false}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={createNewChat}
                  style={styles.createChatButton}
                >
                  <Text style={{ color: "#FFFFFF" }}>Create Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.cancelButton}
                >
                  <Text style={{ color: "#FFFFFF" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: "#252423",
  },
  header: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  friendsSection: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  friendsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  friendsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addFriendButton: {
    backgroundColor: "#e8b800",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  addFriendText: {
    color: "#000",
    fontSize: 24,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  loadingText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    maxHeight: "80%",
  },
  input: {
    height: 40,
    borderColor: "#454545",
    borderWidth: 1,
    marginBottom: 20,
    width: "100%",
    padding: 10,
    backgroundColor: "#2C2C2C",
    color: "#FFFFFF",
    placeholderTextColor: "#FFFFFF",
  },
  createChatButton: {
    backgroundColor: "#e8b800",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#454545",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  chatCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#454545",
  },
  chatName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  commentUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#454545",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userListContainer: {
    paddingBottom: 20,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
