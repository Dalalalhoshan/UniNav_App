import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Register from "./screens/Auth/Register";
import Login from "./screens/Auth/Login";
export default function App() {
  return (
    <UserContext.Provider value={{user , setUser}}>
      <View style={styles.container}>
        <Register />
        {/* <Login /> */}
      </View>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454545",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    // width: "100%",
  },
});
