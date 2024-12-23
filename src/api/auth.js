import instance from ".";
import { storeToken } from "./storage";

const signup = async (userInfo) => {
  try {
    const { data } = await instance.post("/users/signup", userInfo);
    storeToken(data.token);
    return data;
  } catch (error) {
    console.error("Error signing up:", error.response?.data || error.message);
    throw error;
  }
};

const signin = async (credentials) => {
  try {
    const { data } = await instance.post("/users/signin", credentials);
    return data;
  } catch (error) {
    console.error("Error signing in:", error.response?.data || error.message);
    throw error;
  }
};

const getMe = async () => {
  try {
    const { data } = await instance.get("/users/me");
    return data;
  } catch (error) {
    console.error(
      "Error fetching user data:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const { data } = await instance.get("/users/all");
    return data;
  } catch (error) {
    console.error(
      "Error fetching all users:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const updateUser = async (userInfo) => {
  try {
    const { data } = await instance.put("/users/update", userInfo);
    return data;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const followUser = async (id) => {
  try {
    const { data } = await instance.post(`/users/${id}/follow`);
    return data;
  } catch (error) {
    console.error(
      "Error following user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const unfollowUser = async (id) => {
  try {
    const { data } = await instance.post(`/users/${id}/unfollow`);
    return data;
  } catch (error) {
    console.error(
      "Error unfollowing user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getFollowers = async (id) => {
  try {
    const { data } = await instance.get(`/users/${id}/followers`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching followers:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getFollowing = async (id) => {
  try {
    const { data } = await instance.get(`/users/${id}/following`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching following:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export {
  signup,
  signin,
  getMe,
  getAllUsers,
  updateUser,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
