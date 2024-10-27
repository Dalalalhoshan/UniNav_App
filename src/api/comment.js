import instance from ".";
const getComments = async (type, id) => {
  try {
    const { data } = await instance.get(`/comments/${type}/${id}`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching comments:",
      error.response?.data || error.message
    );
    throw error;
  }
};
const createComment = async (communityId, commentData) => {
  try {
    const { data } = await instance.post(`/comments/community/${communityId}`, {
      ...commentData,
      community: communityId, // Ensure community ID is included
      commentType: "community", // Set the comment type
    });
    return data;
  } catch (error) {
    console.error(
      "Error creating comment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const deleteComment = async (commentId) => {
  try {
    const { data } = await instance.delete(`/comments/${commentId}`);
    return data;
  } catch (error) {
    console.error(
      "Error deleting comment:",
      error.response?.data || error.message
    );
    throw error;
  }
};
const replyToComment = async (commentId, reply) => {
  try {
    const { data } = await instance.post(`/comments/${commentId}`, reply);
    return data;
  } catch (error) {
    console.error(
      "Error replying to comment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const createChat = async (chatId, chatData) => {
  try {
    const { data } = await instance.post(`/comments/chat/${chatId}`, {
      ...chatData,
      chat: chatId, // Ensure chat ID is included
      commentType: "chat", // Set the comment type
    });
    return data;
  } catch (error) {
    console.error(
      "Error creating chat message:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export {
  createChat,
  getComments,
  createComment,
  deleteComment,
  replyToComment,
  createComment2,
};
const createComment2 = async (entityId, commentData, commentType) => {
  try {
    const { data } = await instance.post(
      `/comments/${commentType}/${entityId}`,
      {
        ...commentData,
        [commentType]: entityId, // Ensure the correct entity ID is included
        commentType, // Set the comment type
      }
    );
    return data;
  } catch (error) {
    console.error(
      "Error creating comment:",
      error.response?.data || error.message
    );
    throw error;
  }
};
