import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [major, setMajor] = useState("");
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <View style={{ gap: 10 }}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Username"
            style={styles.input}
            keyboardType="default"
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TextInput
            placeholder="Major"
            style={styles.input}
            value={major}
            onChangeText={(text) => setMajor(text)}
          />
        </View>
        <TouchableOpacity style={{ backgroundColor: "#689bf7", padding: 10 }}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              width: 100,
              textAlign: "center",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "white" }}>Have an account?</Text>
        <TouchableOpacity>
          <Text style={{ color: "#689bf7", fontWeight: "bold" }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#454545",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: 300,
    borderRadius: 10,
    borderColor: "gray",
    marginBottom: 10,
    color: "#689bf7",
    fontWeight: "bold",
    color: "white",
    placeholderTextColor: "white",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#689bf7",
  },
  footer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});

export default Register;
