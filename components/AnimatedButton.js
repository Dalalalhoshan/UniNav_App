import React, { useState, useEffect, useRef } from "react";
import { Animated, TouchableOpacity, Text, StyleSheet } from "react-native";

const AnimatedButton = ({ isJoined, handleJoinLeave }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1.1,
      friction: 2,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }).start();
    });
  }, [isJoined]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={[styles.joinLeaveButton, isJoined && styles.leaveButton]}
        onPress={handleJoinLeave}
      >
        <Text style={styles.joinLeaveButtonText}>
          {isJoined ? "Leave" : "Join"}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#121212", // Dark background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff", // Light text color
  },
  followersCount: {
    fontSize: 16,
    color: "#bbbbbb", // Light grey text
  },
  joinLeaveButton: {
    backgroundColor: "#1f1f1f", // Dark button background
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  joinLeaveButtonText: {
    color: "#ffffff", // Light text color
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#333333", // Dark border
  },
  activeTabButton: {
    borderBottomColor: "#007BFF", // Highlight color
  },
  tabButtonText: {
    fontSize: 16,
    color: "#ffffff", // Light text color
  },
  input: {
    height: 40,
    borderColor: "#333333", // Dark border
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#1f1f1f", // Dark input background
    color: "#ffffff", // Light text color
  },
  submitButton: {
    backgroundColor: "#007BFF", // Highlight color
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#ffffff", // Light text color
    fontWeight: "bold",
  },
  commentContainer: {
    backgroundColor: "#1f1f1f", // Dark comment background
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  commentUsername: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#007BFF", // Highlight color
  },
  comment: {
    color: "#ffffff", // Light text color
  },
  resourceContainer: {
    backgroundColor: "#1f1f1f", // Dark resource background
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  resourceTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#007BFF", // Highlight color
  },
  resourceUrl: {
    color: "#007BFF", // Highlight color
    marginBottom: 10,
  },
  resourceActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeButton: {
    backgroundColor: "#28a745", // Like button color
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  likeButtonText: {
    color: "#ffffff", // Light text color
    fontWeight: "bold",
  },
  dislikeButton: {
    backgroundColor: "#dc3545", // Dislike button color
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  dislikeButtonText: {
    color: "#ffffff", // Light text color
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#bbbbbb", // Light grey text
  },
});
export default AnimatedButton;
