import instance from ".";
export const getNotifications = async () => {
  try {
    const response = await instance.get("/notifications");
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

// Function to mark a notification as read
export const markAsRead = async (notificationId) => {
  try {
    const response = await instance.put(
      `/notifications/${notificationId}/read`
    );
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};
