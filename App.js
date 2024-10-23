import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Register from "./screens/Auth/Register";
import Login from "./screens/Auth/Login";
import UserContext from "./context/UserContext";
import Home from "./screens/Home/home";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthNavigation from "./navigation/AuthNavigation/AuthNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { getToken } from "./src/api/storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
  const [user,setUser] = useState(false)
  const queryClient = new QueryClient()
  const checkToken = async () => {
    const token = await getToken();

    if (token) {
      setUser(true);
    }
  };
  useEffect(() => {
    checkToken();
  });

  return (
    <NavigationContainer>
    <UserContext.Provider value={{user , setUser}}>
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
    <SafeAreaView style={{flex: 1, backgroundColor: "black"}}>
      
    
        <Register />
        {/* <Login /> */}
        {/* <Home /> */}
        {/* <AuthNavigation /> */}
    
    
    </SafeAreaView>
    </SafeAreaProvider>
    </QueryClientProvider>
   </UserContext.Provider>
   </NavigationContainer>
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
