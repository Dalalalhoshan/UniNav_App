import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>{/* Add your decorative shapes here */}</View>
      <Text style={styles.title}>CREATE AN ACCOUNT</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="white" />
        <TextInput
          placeholder="Name"
          placeholderTextColor="#666"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="white" />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#666"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="white" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#666"
          style={styles.input}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>or</Text>
      <View style={styles.socialContainer}>
        <FontAwesome
          name="google"
          size={30}
          color="white"
          style={styles.socialIcon}
        />
        <FontAwesome
          name="facebook"
          size={30}
          color="white"
          style={styles.socialIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: "#4b3f72",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "100%",
  },
  input: {
    flex: 1,
    color: "white",
    padding: 10,
  },
  button: {
    backgroundColor: "#f0a500",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    color: "white",
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialIcon: {
    marginHorizontal: 10,
  },
});

export default RegisterScreen;
