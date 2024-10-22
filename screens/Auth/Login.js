import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
    <View style={{ flex: 1, backgroundColor: "#454545" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={{ gap: 10 }}>
          <TextInput
            onChangeText={(value) => setUserInfo({...userInfo, username: value})}
            placeholder="username"
            style={styles.input}
            keyboardType="default"
            autoCapitalize="none"
          />
          <TextInput
            onChangeText={(value) => setUserInfo({...userInfo, password: value})}
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={{ backgroundColor: "#689bf7", padding: 10 }} onPress={login}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              width: 100,
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <Text style={{ color: "white" }}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={{ color: "#689bf7", fontWeight: "bold" }}>Sign up</Text>
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
    placeholderTextColor: "white",
    color: "white",
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

export default Login;
