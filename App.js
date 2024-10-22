import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Register from "./screens/Auth/Register";
import Login from "./screens/Auth/Login";
export default function App() {
  return (
    <View style={styles.container}>
      <Register />
      {/* <Login /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454545",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
