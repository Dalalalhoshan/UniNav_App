import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import UserContext from "../../context/UserContext";
import { signin } from "../../src/api/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "../../Colors";
const Login = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const { user, setUser } = useContext(UserContext);
  const { mutate: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => signin(userInfo),
    onSuccess: () => {
      setUser(true);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/screenCornerE.gif")}
          style={styles.cornerE}
        />
      </View>

      <Text style={styles.title}>Signin</Text>
      <View style={{ gap: 10 }}>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="white" />
          <TextInput
            onChangeText={(value) =>
              setUserInfo({ ...userInfo, username: value })
            }
            placeholder="Username"
            placeholderTextColor="#666"
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="white" />
        <TextInput
          onChangeText={(value) =>
            setUserInfo({ ...userInfo, password: value })
          }
          placeholder="Password"
          placeholderTextColor="#666"
          style={styles.input}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Signin</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>Don't have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={[styles.buttonText, { color: colors.brightBlue }]}>
          Signup
        </Text>
      </TouchableOpacity>

      <View style={styles.waveContainer}>
        <Svg height="100" width="100%" viewBox="0 0 1440 320">
          <Path
            fill={colors.brightBlue}
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
    backgroundColor: colors.bg,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  shapes: {
    position: "absolute",
    top: "30%",
    left: "40%",
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
    top: -90,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "90%",
    padding: 3,
  },
  input: {
    flex: 1,
    color: "white",
    padding: 10,
  },
  button: {
    backgroundColor: colors.brightBlue,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  orText: {
    color: colors.white,
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
  cornerE: {
    width: 100,
    height: 100,
    transform: [{ rotate: "-45deg" }],
    borderRadius: 100,
    bottom: 25,
    right: 25,
  },
});

export default Login;
