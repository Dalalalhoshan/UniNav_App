import instance from ".";
const getAllCommunities = async () => {
  try {
    const { data } = await instance.get("/community");
    return data;
  } catch (error) {
    console.error(
      "Error fetching communities:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getCommunityById = async (id) => {
  try {
    const { data } = await instance.get(`/community/${id}`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching community:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const createCommunity = async (communityData) => {
  try {
    const { data } = await instance.post("/community", communityData);
    return data;
  } catch (error) {
    console.error(
      "Error creating community:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const updateCommunity = async (id, communityData) => {
  try {
    const { data } = await instance.put(`/community/${id}`, communityData);
    return data;
  } catch (error) {
    console.error(
      "Error updating community:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const deleteCommunity = async (id) => {
  try {
    const { data } = await instance.delete(`/community/${id}`);
    return data;
  } catch (error) {
    console.error(
      "Error deleting community:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const requestToJoinCommunity = async (id) => {
  try {
    const { data } = await instance.post(`/community/${id}/request`);
    return data;
  } catch (error) {
    console.error(
      "Error requesting to join community:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const approveJoinRequest = async (id, userId) => {
  try {
    const { data } = await instance.post(`/community/${id}/approve/${userId}`);
    return data;
  } catch (error) {
    console.error(
      "Error approving join request:",
      error.response?.data || error.message
    );
    throw error;
  }
};
const leaveCommunity = async (communityId) => {
  try {
    const { data } = await instance.delete(`/community/${communityId}/leave`); // Adjust the endpoint as necessary
    return data;
  } catch (error) {
    console.error(
      "Error leaving community:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export {
  approveJoinRequest,
  requestToJoinCommunity,
  deleteCommunity,
  updateCommunity,
  createCommunity,
  getCommunityById,
  getAllCommunities,
  leaveCommunity,
};
