import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Bot = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fahim</Text>
      <Text style={styles.subHeader}>Best Student Assistant AI</Text>
      <Image
        source={require("../../assets/4bcb1fb72d1d08efa44efa5ceb712ec7.gif")}
        style={styles.image}
      />
      <Text style={styles.subText}>How can I help you?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Chatbot")}
      >
        <Text style={styles.buttonText}>Start New Conversation</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.voiceButton]} // Added new style for voice button
        onPress={() => navigation.navigate("ChatbotVoice")}
      >
        <Text style={styles.buttonText}>Voice Assistant</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1E1E1E",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subHeader: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  subText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10, // Added margin to separate buttons
  },
  voiceButton: {
    backgroundColor: "#28A745", // Different color for voice button
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default Bot;
