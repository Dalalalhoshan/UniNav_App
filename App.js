import { StyleSheet, View } from "react-native";
import Register from "./screens/Auth/Register";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigation from "./src/navigation/HomeNavigation/HomeNavigation";
import UserContext from "./src/context/UserContext";
import { useState } from "react";
import AuthNavigation from "./src/navigation/AuthNavigation/AuthNavigation";

export default function App() {
  const [user, setUser] = useState(false);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
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
