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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Chatbot")}
        >
          <Text style={styles.buttonText}>Start New Conversation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.voiceButton]}
          onPress={() => navigation.navigate("ChatbotVoice")}
        >
          <Text style={styles.buttonText}>Voice Assistant</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subHeader: {
    fontSize: 20,
    color: "#FFF",
    marginBottom: 30,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  subText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#0C70FF",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1,
  },
  voiceButton: {
    backgroundColor: "#689bf7",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Bot;
