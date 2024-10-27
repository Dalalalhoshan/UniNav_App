import instance from ".";
// Create a new chat
const createChat = async (chatData) => {
  try {
    const { data } = await instance.post("/chat/", chatData);
    return data;
  } catch (error) {
    console.error(
      "Error creating chat:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get all chats
const getAllChats = async () => {
  try {
    const { data } = await instance.get("/chat/");
    return data;
  } catch (error) {
    console.error(
      "Error fetching chats:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get a specific chat by ID
const getChatById = async (chatId) => {
  try {
    const { data } = await instance.get(`/chat/${chatId}`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching chat:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Add a comment to a chat
const addCommentToChat = async (chatId, commentData) => {
  try {
    const { data } = await instance.post(
      `/chat/${chatId}/comments`,
      commentData
    );
    return data;
  } catch (error) {
    console.error(
      "Error adding comment to chat:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export { getAllChats, createChat, getChatById, addCommentToChat };
