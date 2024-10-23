import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from 'react-native-dropdown-select-list'
import { signup } from "../../src/api/auth";
import UserContext from "../../context/UserContext";
const { width, height } = Dimensions.get("window");
const RegisterScreen = () => {
  // const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const { user, setUser } = useContext(UserContext);
  const { mutate: register, isLoading } = useMutation({
    mutationKey: ["signup"],
    mutationFn: () => signup(userInfo),
    onSuccess: () => {
      setUser(true);
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>{/* Add your decorative shapes here */}</View>
      <Svg height="100" width="100" style={styles.shapes}>
        <Circle cx="20" cy="20" r="3" fill="#f0a500" />
        <Circle cx="50" cy="40" r="2" fill="#f0a500" />
        <Circle cx="80" cy="60" r="3" fill="#f0a500" />
        <Rect x="40" y="20" width="10" height="10" fill="#f0a500" />
        <Rect x="60" y="50" width="8" height="8" fill="#f0a500" />
      </Svg>
      <Text style={styles.title}>CREATE AN ACCOUNT</Text>
      <View style={{ gap: 10 }}>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="white" />
          <TextInput
            placeholder="Name"
            placeholderTextColor="#666"
            style={styles.input}
            onChangeText={(value) =>
              setUserInfo((prev) => ({ ...prev, name: value }))
            }
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="white" />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#666"
          style={styles.input}
          onChangeText={(value) =>
            setUserInfo((prev) => ({ ...prev, email: value }))
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="white" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#666"
          style={styles.input}
          secureTextEntry
          onChangeText={(value) =>
            setUserInfo((prev) => ({ ...prev, password: value }))
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="white" />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#666"
          style={styles.input}
          secureTextEntry
          onChangeText={(value) =>
            setUserInfo((prev) => ({ ...prev, confirmPassword: value }))
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <SelectList
        style={{width: "90%"}}
        placeholder="Major"
          setSelected={(value) => setUserInfo((prev) => ({ ...prev, major: value }))}
          data={["Computer Science", "Software Engineering", "Cyber Security"]}
          save="value"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={register}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={[styles.buttonText, { color: "#f0a500" }]}>Login</Text>
      </TouchableOpacity>

      <View style={styles.waveContainer}>
        <Svg height="150" width="100%" viewBox="0 0 1440 320">
          <Path
            fill="#f0a500"
            d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,245.3C672,245,768,203,864,186.7C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 250, // Adjusted height for full coverage
    backgroundColor: "#4b3f72",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  shapes: {
    position: "absolute",
    top: "30%",
    left: "40%",
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
    width: "90%",
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
  waveContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default RegisterScreen;
