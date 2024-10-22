import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import UserContext from "../../context/UserContext";
import { signin } from "../../src/api/user";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
const Login = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const {user,setUser} = useContext(UserContext); 
   const {mutate: login} = useMutation({
    mutationKey: ["login"],
    mutationFn: () => signin(userInfo),
    onSuccess: () => {
      setUser(true);
      
    }
  });
  if(user) {
  navigation.navigate("Home")
  };
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
      <Text style={styles.title}>LOGIN</Text>
      <View style={{ gap: 10 }}>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="white" />
          <TextInput
            onChangeText={(value) => setUserInfo({...userInfo, username: value})}
            placeholder="Username"
            placeholderTextColor="#666"
            style={styles.input}
            
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="white" />
        <TextInput
            onChangeText={(value) => setUserInfo({...userInfo, password: value})}
          placeholder="Password"
          placeholderTextColor="#666"
          style={styles.input}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button}  onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.waveContainer}>
        <Svg height="100" width="100%" viewBox="0 0 1440 320">
          <Path
            fill="#f0a500"
            d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,245.3C672,245,768,203,864,186.7C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </Svg>
      </View>
    </View>
  );
};
const { width, height } = Dimensions.get("window");

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

export default LoginScreen;
